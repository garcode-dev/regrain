import { home } from "@/content/site";

export default function Mission() {
  const m = home.mission;
  return (
    <section className="section mission" id="mission">
      <div className="container">
        <span className="label on-dark reveal">{m.eyebrow}</span>
        <div className="mission-grid">
          <blockquote className="reveal">{m.quote}</blockquote>
          <p className="reveal">{m.body}</p>
        </div>
        <ul className="pill-list reveal" aria-label="Mission focus areas">
          {m.focus.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}
