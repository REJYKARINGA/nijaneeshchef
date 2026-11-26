"use client";
import { useEffect, useRef, useState } from "react";

function Count({ end, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(end);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      let t0 = null;
      const st = (ts) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / 1200);
        setV(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(st);
      };
      raf = requestAnimationFrame(st);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);

  return <b ref={ref}>{v}{suffix}</b>;
}

export default function Stats({ employers, areas, months }) {
  return (
    <div className="stats">
      <div className="wrap">
        <div className="stat"><Count end={7} suffix="+" /><span>Years of experience</span></div>
        <div className="stat"><Count end={employers} /><span>Kitchens worked in</span></div>
        <div className="stat"><Count end={areas} /><span>Business areas</span></div>
        <div className="stat"><Count end={months} /><span>Months in F&amp;B production</span></div>
      </div>
    </div>
  );
}
