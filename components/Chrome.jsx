"use client";
import { useEffect, useState } from "react";

const UPDATED = new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
}).format(new Date(process.env.NEXT_PUBLIC_BUILD_TIME || Date.now())) + " IST";

const LINKS = [["#about", "Home"], ["#business", "Business"], ["#resume", "Resume"], ["#contact", "Contact"]];

/* sticky bar with scroll progress, active link, WhatsApp button and back-to-top button */
export default function Chrome() {
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => { setDark(document.documentElement.dataset.theme === "dark"); }, []);
  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setDark(!dark);
  };

  useEffect(() => {
    const sc = () => {
      const h = document.documentElement, m = h.scrollHeight - h.clientHeight;
      setPct(m > 0 ? (h.scrollTop / m) * 100 : 0);
      setShowTop(h.scrollTop > 600);
      let c = 0;
      LINKS.forEach(([id], i) => {
        const s = document.querySelector(id);
        if (s && s.getBoundingClientRect().top < 140) c = i;
      });
      setActive(c);
    };
    window.addEventListener("scroll", sc, { passive: true });
    sc();
    return () => window.removeEventListener("scroll", sc);
  }, []);

  const up = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div id="progress" aria-hidden="true" style={{ width: pct + "%" }} />
      <header className="bar">
        <div className="preview-note" role="status">
          <span className="tag">Client preview</span>
          <span>Latest update: {UPDATED}</span>
        </div>
        <div className="wrap">
          <a className="logo" href="#top">NIJANEESH<span>CHEF</span></a>
          <button className="theme-toggle" type="button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
            <svg className="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg className="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button className="menu-toggle" type="button" aria-label="Menu" aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu((m) => !m)}><span /></button>
          <button className={"menu-overlay" + (menu ? " open" : "")} type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setMenu(false)} />
          <nav id="main-nav" aria-label="Main" className={menu ? "open" : undefined}>
            {LINKS.map(([href, label], i) => (
              <a key={href} href={href} className={i === active ? "active" : undefined} onClick={() => setMenu(false)}>{label}</a>
            ))}
          </nav>
        </div>
      </header>
      <a className="wa" href="https://wa.me/919995099969" aria-label="Chat on WhatsApp" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.200 14c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.200c.1.200 0 .4 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.500.300.1.200.1.800-.1 1.400z" /></svg>
      </a>
      <button className={"top" + (showTop ? " show" : "")} type="button" aria-label="Scroll to top" onClick={up}>↑</button>
    </>
  );
}
