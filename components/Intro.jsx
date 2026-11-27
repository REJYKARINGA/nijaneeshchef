"use client";
import { useEffect, useState } from "react";

const FULL = "NIJANEESH";

// mosaic: the black coat photo is the main (big) one
const MAIN = { src: "/chef-black-coat.png", alt: "Chef Nijaneesh in a black chef coat plating a dish", pos: "50% 28%" };
const SIDE = [
  { src: "/chef-white-coat.png", alt: "Chef Nijaneesh in a white chef coat in a professional kitchen", pos: "50% 22%" },
  { src: "/chef-apron.png", alt: "Chef Nijaneesh in an apron cooking in a busy kitchen", pos: "50% 22%" },
];

export default function Intro() {
  const [n, setN] = useState(FULL.length);

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
    <section className="intro" id="about">
      <div className="wrap hero" id="top">
        {/* top: heading */}
        <div className="hero-top rise">
          <p className="label welcome">Family-Friendly Chef</p>
          <h1 className="hi">Welcome to <span className="name">My Kitchen</span></h1>
          <p className="tagline">Good Food, Happy Families, Beautiful Memories!</p>
        </div>

        {/* middle: photo mosaic */}
        <div className="mosaic rise" style={{ animationDelay: ".12s" }}>
          <img className="m-main" src={MAIN.src} alt={MAIN.alt} style={{ objectPosition: MAIN.pos }} fetchPriority="high" />
          {SIDE.map((p, i) => (
            <img key={p.src} className={"m-side m-side-" + (i + 1)} src={p.src} alt={p.alt} style={{ objectPosition: p.pos }} loading="lazy" />
          ))}
          <span className="m-badge">Chef <b>{FULL.slice(0, n) || "​"}</b><i className="caret" aria-hidden="true" /></span>
        </div>

        {/* bottom: story, role, actions */}
        <div className="hero-bottom rise" style={{ animationDelay: ".2s" }}>
          <p className="about">Welcome to my culinary world, where passion meets flavour and every meal is prepared with love. As a family-friendly chef, I believe that food brings people together. My goal is to create delicious, healthy and comforting meals that everyone in the family can enjoy.</p>
          <p className="role">Assistant Manager (Dietary Department) · Regional Cancer Centre, Medical College, Trivandrum</p>
          <div className="status"><span className="dot" aria-hidden="true" />Available for freelance work</div>
          <div className="cta">
            <a className="btn primary" href="#contact">Plan a meal with me</a>
            <a className="btn ghost" href="#resume">My experience</a>
          </div>
          <div className="social" aria-label="Social profiles">
            <a className="fb" href="#contact" aria-label="Facebook">f</a>
            <a className="tw" href="#contact" aria-label="Twitter">t</a>
            <a className="yt" href="#contact" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
    </section>
  );
}
