import Image from "next/image";
import { home } from "@/content/site";

export default function Hero() {
  const h = home.hero;
  return (
    <section className="hero" id="top">
      {h.photo ? (
        <Image className="hero-img" src={h.photo} alt="" fill priority sizes="100vw" />
      ) : (
        <>
          {/* Terraced-pit contour motif, stands in until a hero photo is supplied */}
          <div className="hero-rings" aria-hidden="true" />
          <span className="hero-photo-note" aria-hidden="true">[Hero photo 1920×1080]</span>
        </>
      )}
      <div className="container">
        <span className="chip">{h.eyebrow}</span>
        <h1>{h.title}</h1>
        <p className="hero-lead">{h.lead}</p>
        <div className="hero-actions">
          <a className="btn btn-light" href={h.primary.href}>{h.primary.label}</a>
          <a className="btn btn-ghost" href={h.secondary.href}>{h.secondary.label}</a>
        </div>
      </div>
    </section>
  );
}
