import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contact, site } from "@/content/site";
import { interestLabel, validateContact, type ContactInput } from "@/lib/contact";

// Receives the contact form and emails it to the NGO with Resend (https://resend.com).
// It sends two emails:
//   1. The message to the NGO (CONTACT_TO). Replying goes straight to the visitor.
//   2. A short "we've received your message" confirmation to the visitor. If this one fails
//      the message still counts as sent; the failure is only logged.
//
// Environment variables (put them in .env.local for local dev, and in your host's settings
// — Vercel/Netlify → Settings → Environment variables — for the live site). See .env.example.
//   RESEND_API_KEY   required — create one at resend.com/api-keys
//   CONTACT_FROM     sender address on a domain you've verified in Resend,
//                    e.g. "Re-Green & Reclaim Africa <website@regreenreclaimafrica.org>".
//                    Until a domain is verified you can use "... <onboarding@resend.dev>",
//                    but Resend then only delivers to the email address you signed up to Resend with.
//   CONTACT_TO       optional — inbox that receives messages (default: the email in content/site.ts).
//                    Separate several addresses with commas.

export const runtime = "nodejs";

// ---- Rate limit: at most 5 submissions per visitor (IP) every 10 minutes ----
// Kept in memory, so it resets when the server restarts and isn't shared between serverless
// instances. It stops casual repeat-spam; for heavy abuse, move it to Upstash Redis or similar.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const fail = (status: number, error: string, message: string, extra: object = {}) =>
  NextResponse.json({ ok: false, error, message, ...extra }, { status });

// ---------- Email content ----------

function enquiryEmail(d: ContactInput, interest: string) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone],
    ["Interested in", interest],
    ["Organisation", d.organisation],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", d.message].join("\n");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#141a16">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f3d24">New message from the ${escapeHtml(site.shortName)} website</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#3d4640;white-space:nowrap">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <div style="padding:16px 18px;background:#f4f3ee;border-radius:10px;white-space:pre-wrap">${escapeHtml(d.message)}</div>
      <p style="margin-top:20px;color:#3d4640;font-size:13px">Reply to this email to answer ${escapeHtml(d.name)} directly.</p>
    </div>`;
  return { text, html };
}

function confirmationEmail(d: ContactInput, replyAddress: string) {
  const first = d.name.split(/\s+/)[0];
  const text = [
    `Hi ${first},`,
    "",
    `Thank you for contacting ${site.name}. We've received your message and will get back to you soon.`,
    "",
    "Here's a copy of what you sent:",
    "",
    d.message,
    "",
    "If you need to add anything, just reply to this email.",
    "",
    site.name,
    replyAddress,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#141a16;max-width:560px">
      <p style="margin:0 0 14px">Hi ${escapeHtml(first)},</p>
      <p style="margin:0 0 14px">Thank you for contacting ${escapeHtml(site.name)}. We've received your message and will get back to you soon.</p>
      <p style="margin:0 0 8px;color:#3d4640">Here's a copy of what you sent:</p>
      <div style="padding:16px 18px;background:#f4f3ee;border-radius:10px;white-space:pre-wrap">${escapeHtml(d.message)}</div>
      <p style="margin:20px 0 0">If you need to add anything, just reply to this email.</p>
      <p style="margin:20px 0 0"><strong>${escapeHtml(site.name)}</strong><br/>
        <a href="mailto:${escapeHtml(replyAddress)}" style="color:#14632f">${escapeHtml(replyAddress)}</a></p>
    </div>`;
  return { text, html };
}

// ---------- Handler ----------

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return fail(429, "rate_limited", "You've sent several messages in a short time. Please wait a few minutes and try again.");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "bad_request", "Something went wrong with that request. Please try again.");
  }

  const result = validateContact(body);
  if (!result.ok) {
    return fail(422, "invalid_fields", "Please check the highlighted fields.", { errors: result.errors });
  }
  const d = result.data;

  // Spam trap filled in → pretend success, send nothing.
  if (d.company_website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — the message was not sent.");
    return fail(503, "not_configured", contact.form.error);
  }

  const from = process.env.CONTACT_FROM || `${site.shortName} <onboarding@resend.dev>`;
  const to = (process.env.CONTACT_TO || contact.form.to)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const interest = interestLabel(d.interest);
  const resend = new Resend(apiKey);

  // 1) The message to the NGO — this one must succeed.
  const enquiry = enquiryEmail(d, interest);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: d.email,
    subject: `Website message${interest ? ` · ${interest}` : ""} — ${d.name}`,
    text: enquiry.text,
    html: enquiry.html,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return fail(502, "send_failed", contact.form.error);
  }

  // 2) Confirmation to the visitor — best effort.
  const confirm = confirmationEmail(d, to[0]);
  const ack = await resend.emails.send({
    from,
    to: [d.email],
    replyTo: to,
    subject: `We've received your message — ${site.shortName}`,
    text: confirm.text,
    html: confirm.html,
  });
  if (ack.error) console.warn("[contact] Confirmation email to visitor failed:", ack.error);

  return NextResponse.json({ ok: true, id: data?.id });
}
