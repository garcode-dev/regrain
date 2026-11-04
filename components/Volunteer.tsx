import Image from "next/image";
import Placeholder from "./Placeholder";
import { publicImage } from "@/lib/images";
import { home, site } from "@/content/site";

export default function Volunteer() {
  const v = home.volunteer;
  const photo = publicImage(v.photo);
  return (
    <section className="volunteer" id="volunteer">
      <div className="container">
        <div className="vol-box reveal">
          <div className="vol-copy">
            <span className="label on-dark">{v.eyebrow}</span>
            <h2>{v.title}</h2>
            {v.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <div className="vol-actions">
              <a className="btn btn-light" href={v.buttonHref} data-interest={v.buttonInterest}>{v.button}</a>
              <a className="mail" href={site.contact.emailHref}>{site.contact.email}</a>
              <a className="mail" href={site.contact.phones[0].href}>{site.contact.phones[0].label}</a>
            </div>
          </div>
          {photo ? (
            <div className="vol-img">
              <Image src={photo} alt="Volunteers planting trees on reclaimed land" fill sizes="(max-width: 900px) 100vw, 600px" />
            </div>
          ) : (
            <Placeholder art="pit" label="Volunteer photo 900×700" className="vol-art" />
          )}
        </div>
      </div>
    </section>
  );
}
