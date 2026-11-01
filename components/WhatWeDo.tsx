import Placeholder from "./Placeholder";
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
          {w.methods.map((m, i) => (
            <article className="card reveal" key={m.title}>
              <Placeholder art={m.art} label="Photo 800×600" />
              <div className="card-body">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
