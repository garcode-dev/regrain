import { home } from "@/content/site";

export default function Who() {
  const w = home.who;
  return (
    <section className="section" id="who">
      <div className="container who-grid">
        <div className="reveal">
          <span className="label">{w.eyebrow}</span>
          <p className="who-intro">
            <strong>{w.introStrong}</strong>
            {w.introRest}
          </p>
          <div className="stats">
            {w.stats.map((s) => (
              <div className="stat" key={s.value}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="who-body">{w.body}</p>
          <ul className="hazards" aria-label="Hazards">
            {w.hazards.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
