import ContactForm from "./ContactForm";
import { contact, site } from "@/content/site";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-info reveal">
          <span className="label">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p className="contact-lead">{contact.lead}</p>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd><a href={site.contact.emailHref}>{site.contact.email}</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                {site.contact.phones.map((p) => (
                  <a key={p.href} href={p.href}>{p.label}</a>
                ))}
              </dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd><address>{site.contact.address}</address></dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
