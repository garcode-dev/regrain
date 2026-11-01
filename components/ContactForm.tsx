"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

const f = contact.form;
const isInterest = (v: string | null | undefined): v is string => !!v && f.interests.some((i) => i.value === v);

// Contact form. Posts to /api/contact, which emails the message with Resend
// (set RESEND_API_KEY — see README). Validation rules live in lib/contact.ts and run here
// first (instant feedback) and again on the server.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Pre-select from a link like /?interest=volunteer#contact
    const q = new URLSearchParams(window.location.search).get("interest");
    if (isInterest(q)) setInterest(q);

    // Pre-select from in-page links like <a href="#contact" data-interest="volunteer">
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("a[data-interest]");
      const v = a?.dataset.interest;
      if (isInterest(v)) {
        setInterest(v);
        setStatus((s) => (s === "sent" ? "idle" : s));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function focusFirstError(errs: ContactErrors) {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  // Clear a field's error as soon as the visitor edits it.
  function clearError(e: React.FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as ContactField;
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      setServerMessage("");
      setStatus("idle");
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        if (json.errors) {
          setErrors(json.errors);
          focusFirstError(json.errors);
        }
        setServerMessage(json.message || f.error);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
      setInterest("");
    } catch {
      // Network failure: keep what the visitor typed so they can try again.
      setServerMessage(f.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card form-done" role="status">
        <span className="check-big" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <p>{f.confirmation}</p>
      </div>
    );
  }

  const fieldClass = (name: ContactField) => `field${errors[name] ? ` ${styles.invalid}` : ""}`;

  const a11y = (name: ContactField) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const errorText = (name: ContactField) =>
    errors[name] ? (
      <span className={styles.fieldError} id={`${name}-error`}>{errors[name]}</span>
    ) : null;

  // Show the NGO's address after the generic error (it ends with "...email us directly at").
  const showEmailLink = serverMessage === f.error;

  return (
    <form ref={formRef} className="form-card reveal" onSubmit={onSubmit} onInput={clearError} noValidate>
      <h3>{f.title}</h3>
      <div className="field-row">
        <label className={fieldClass("name")}>
          <span>Full name <em aria-hidden="true">*</em></span>
          <input name="name" type="text" autoComplete="name" required {...a11y("name")} />
          {errorText("name")}
        </label>
        <label className={fieldClass("email")}>
          <span>Email address <em aria-hidden="true">*</em></span>
          <input name="email" type="email" autoComplete="email" required {...a11y("email")} />
          {errorText("email")}
        </label>
      </div>
      <div className="field-row">
        <label className={fieldClass("phone")}>
          <span>Phone number <small>(optional)</small></span>
          <input name="phone" type="tel" autoComplete="tel" {...a11y("phone")} />
          {errorText("phone")}
        </label>
        <label className={fieldClass("organisation")}>
          <span>Organisation <small>(optional)</small></span>
          <input name="organisation" type="text" autoComplete="organization" {...a11y("organisation")} />
          {errorText("organisation")}
        </label>
      </div>
      <label className={fieldClass("interest")}>
        <span>I&apos;m getting in touch about</span>
        <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value)} {...a11y("interest")}>
          <option value="">Choose one…</option>
          {f.interests.map((i) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
        {errorText("interest")}
      </label>
      <label className={fieldClass("message")}>
        <span>Your message <em aria-hidden="true">*</em></span>
        <textarea name="message" rows={5} required maxLength={5000} {...a11y("message")} />
        {errorText("message")}
      </label>
      {/* Spam trap: hidden from people, bots fill it in */}
      <input className="hp" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : status === "error" ? "Try Again" : f.button}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      {status === "error" && serverMessage && (
        <p className="form-note form-error" role="alert">
          {serverMessage}
          {showEmailLink && (
            <>
              {" "}<a href={`mailto:${f.to}`}>{f.to}</a>
            </>
          )}
        </p>
      )}
    </form>
  );
}
