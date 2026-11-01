import { home } from "@/content/site";

export default function Objectives() {
  const o = home.objectives;
  return (
    <section className="section" id="objectives">
      <div className="container">
        <div className="obj-head reveal">
          <span className="label">{o.eyebrow}</span>
          <h2>{o.title}</h2>
        </div>
        <ol className="obj-grid">
          {o.items.map((item) => (
            <li key={item.text} className={`reveal ${"wide" in item && item.wide ? "wide" : ""}`}>{item.text}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
