# Re-Green & Reclaim Africa Initiative website (Next.js)

## Run it locally
You need Node.js 20 or newer (https://nodejs.org).

```bash
npm install      # first time only
npm run dev      # open http://localhost:3000
```

`npm run build` makes a production build. Deploy by importing this folder into Vercel or Netlify.

## Page
A single landing page at `/`. Its sections follow the copy in `copy.md`:
Hero, Who We Are, What We Do, Our Mission, Aims and Objectives, Trustees, Volunteer With Us, Contact, Footer.
The layout and style follow the Karuna Webflow template.

## Where things live
```
app/
  layout.tsx        Site-wide shell: metadata, fonts (Geist + Inter), nav, footer
  page.tsx          Home page: lists the sections in order
  globals.css       All styling. Brand colours/fonts are the tokens at the top (:root)
  icon.png          Favicon (from the logo)
  api/contact/      Contact form endpoint (emails the message via Resend)
components/         Hero, Who, WhatWeDo, Mission, Objectives, Trustees, Volunteer, Contact
                    Shared: ContactForm, Nav, Footer, Logo, Placeholder, RevealObserver
lib/contact.ts      Contact form validation (used by the form and the API route)
content/site.ts     ALL the copy and links. Edit text here, not in the components
public/images/      logo.jpg (full logo), logo-mark.png (emblem for the nav)
copy.md             The client's web copy as supplied
```

## Contact form — turn on email delivery
The form in the Contact section posts to `/api/contact`, which sends through Resend (https://resend.com),
the same setup as the Garcode site. Copy `.env.example` to `.env.local` for local testing, and set the same
variables on Vercel/Netlify:
- `RESEND_API_KEY` (required)
- `CONTACT_TO`: inbox for messages (default `info@regreenreclaimafrica.org`)
- `CONTACT_FROM`: sender on a domain verified in Resend, e.g. `Re-Green & Reclaim Africa <website@regreenreclaimafrica.org>`

Each message is emailed to `CONTACT_TO` (replying goes to the visitor), and the visitor gets a short
confirmation email. Until `RESEND_API_KEY` is set, submitting shows an error asking the visitor to email
the NGO directly. Spam protection: a hidden honeypot field and a limit of 5 messages per visitor per 10 minutes.

The "I'm getting in touch about" options are in `content/site.ts` (`contact.form.interests`). Confirm them
with the client. Any link with `data-interest="volunteer"` (like the Volunteer section's button) opens the
form with that option selected.

## Photos
Drop each photo into `public/images/` with the file name below and rebuild (`npm run dev` picks it up on
restart). It replaces its illustrated placeholder automatically; no code change needed.

| File name | Where it shows | Size |
| --- | --- | --- |
| `hero.jpg` | Hero background | 1920×1080 |
| `reshaping.jpg` | What We Do · Structured reshaping | 800×600 |
| `stream-channels.jpg` | What We Do · Restoration of stream channels | 800×600 |
| `reforestation.jpg` | What We Do · Reforestation | 800×600 |
| `volunteer.jpg` | Volunteer With Us panel | 900×700 |
| `trustee-rex-hegen-aii.jpg` | Trustees · Engr. Rex Hegen Aii PhD | 600×750 |
| `trustee-benjamin-gar.jpg` | Trustees · Mr. Benjamin Gar | 600×750 |

The hero, card and volunteer photos were AI-generated in Canva as stand-ins. Swap in real project photos
when the NGO has them. Trustee portraits must be real photos supplied by the trustees.

## Still to do before launch
Search the code for `TODO`:
- **Contact form:** add the Resend environment variables above.
- **Email:** set to `info@regreenreclaimafrica.org`. Confirm the domain and create the inbox, or change it once in `content/site.ts`.
- **Photos:** see Photos below.
- **Open Graph image:** add `public/og.png` (1200×630) in `app/layout.tsx`.
- **Brand colours:** taken from the logo (forest green, leaf green, lime, sun gold, water blue). Confirm with the client.
