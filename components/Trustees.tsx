import Image from "next/image";
import { home } from "@/content/site";
import { publicImage } from "@/lib/images";

const initials = (name: string) =>
  name
    .replace(/^(Engr\.|Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "")
    .replace(/\s+PhD$/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Trustees() {
  const t = home.trustees;
  return (
    <section className="section trustees" id="trustees">
      <div className="container">
        <div className="obj-head reveal">
          <span className="label">{t.eyebrow}</span>
          <h2>{t.title}</h2>
        </div>
        <ul className="trustee-grid">
          {t.items.map((p) => {
            const photo = publicImage(p.photo);
            return (
            <li className="trustee reveal" key={p.name}>
              <div className="trustee-photo">
                {photo ? (
                  <Image src={photo} alt={p.name} fill sizes="(max-width: 560px) 100vw, 380px" />
                ) : (
                  <>
                    <span className="trustee-initials" aria-hidden="true">{initials(p.name)}</span>
                    <em>[Portrait 600×750]</em>
                  </>
                )}
              </div>
              <div className="trustee-body">
                <h3>{p.name}</h3>
                <p>{p.role}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
