import Image from "next/image";
import Placeholder from "./Placeholder";
import { publicImage } from "@/lib/images";
import { home } from "@/content/site";

export default function WhatWeDo() {
  const w = home.what;
  return (
    <section className="section what" id="what">
      <div className="container">
        <div className="center reveal">
          <span className="label on-dark">{w.eyebrow}</span>
          <h2>{w.title}</h2>
          <p className="lead">{w.lead}</p>
        </div>
        <div className="cards">
          {w.methods.map((m, i) => {
            const photo = publicImage(m.photo);
            return (
            <article className="card reveal" key={m.title}>
              {photo ? (
                <div className="card-img">
                  <Image src={photo} alt={m.title} fill sizes="(max-width: 900px) 100vw, 400px" />
                </div>
              ) : (
                <Placeholder art={m.art} label="Photo 800×600" />
              )}
              <div className="card-body">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.title}</h3>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
