"use client";
import { useEffect, useState } from "react";

const FULL = "NIJANEESH";
// first image is the main (priority) one
const PHOTOS = [
  { src: "/chef-black-coat.png", alt: "Chef Nijaneesh in a black chef coat plating a dish", pos: "50% 30%" },
  { src: "/chef-white-coat.png", alt: "Chef Nijaneesh in a white chef coat in a professional kitchen", pos: "50% 25%" },
  { src: "/chef-apron.png", alt: "Chef Nijaneesh in an apron cooking in a busy kitchen", pos: "50% 25%" },
];

export default function Intro() {
  const [n, setN] = useState(FULL.length);
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);

  // slow auto-rotate, main image stays on screen longest
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % PHOTOS.length), cur === 0 ? 6000 : 3500);
    return () => clearTimeout(t);
  }, [cur, paused]);

  // typing name, like the live site
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ci = FULL.length, dir = -1, t;
    const tick = () => {
      setN(ci);
      if (dir === 1 && ci === FULL.length) { dir = -1; t = setTimeout(tick, 2600); return; }
      if (dir === -1 && ci === 0) { dir = 1; t = setTimeout(tick, 500); return; }
      ci += dir;
      t = setTimeout(tick, dir === 1 ? 140 : 70);
    };
    tick();
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="intro" id="about" style={{ paddingTop: 56 }}>
      <div className="wrap" id="top">
        <div className="rise">
          <p className="label welcome">Chef · Hospitality · Business</p>
          <h1 className="hi">Food, <span className="name">crafted with care.</span></h1>
          <p className="chefname">Chef <b>{FULL.slice(0, n) || "​"}</b><span className="caret" aria-hidden="true" /></p>
          <p className="role">Assistant Manager (Dietary Department)<br />Regional Cancer Centre<br />Medical College, Trivandrum</p>
          <p className="about">I’m passionate about Business and I’m always looking for opportunities to collaborate and share insights. I’m looking forward to connecting with all of you!</p>
          <h2 className="label find">Find with me</h2>
          <div className="social" aria-label="Social profiles">
            <a className="fb" href="#contact" aria-label="Facebook">f</a>
            <a className="tw" href="#contact" aria-label="Twitter">t</a>
            <a className="yt" href="#contact" aria-label="YouTube">▶</a>
          </div>
          <div className="status"><span className="dot" aria-hidden="true" />Available for freelance work</div>
          <div className="cta">
            <a className="btn primary" href="#contact">Connect with me</a>
            <a className="btn ghost" href="#resume">See my resume</a>
          </div>
        </div>
        <div className="gallery rise" style={{ animationDelay: ".15s" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="photo">
            {PHOTOS.map((p, i) => (
              <img key={p.src} src={p.src} alt={p.alt} className={i === cur ? "on" : undefined} style={{ objectPosition: p.pos }} fetchPriority={i === 0 ? "high" : undefined} loading={i === 0 ? "eager" : "lazy"} />
            ))}
          </div>
          <div className="thumbs" role="group" aria-label="Photos">
            {PHOTOS.map((p, i) => (
              <button key={p.src} type="button" className={i === cur ? "on" : undefined} aria-label={`Show photo ${i + 1}`} aria-pressed={i === cur} onClick={() => setCur(i)}>
                <img src={p.src} alt="" style={{ objectPosition: p.pos }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
