"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <nav aria-label="Main">
          <ul className="nav-links" id="navLinks">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-ghost nav-btn" href={site.navCta.href}>{site.navCta.label}</a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="navLinks"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </header>
  );
}
