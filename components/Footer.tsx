import Image from "next/image";
import { home, site } from "@/content/site";

export default function Footer() {
  const f = home.footer;
  const words = [...f.marquee, ...f.marquee, ...f.marquee, ...f.marquee];
  return (
    <footer>
      <div className="container foot-grid">
        <div>
          <Image className="foot-logo" src="/images/logo.jpg" alt={`${site.name} logo`} width={150} height={150} />
          <p className="foot-tag">{f.tagline}</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            {[...site.nav.slice(0, -1), site.navCta, site.nav[site.nav.length - 1]].map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={site.contact.emailHref}>{site.contact.email}</a></li>
            {site.contact.phones.map((p) => (
              <li key={p.href}><a href={p.href}>{p.label}</a></li>
            ))}
            <li><address>{site.contact.address}</address></li>
          </ul>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {words.map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>
      <div className="container copyright">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
