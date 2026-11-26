"use client";
import { useEffect, useState } from "react";

/* Quiet intro, same idea as the WishiGrove splash: the brand lockup fades in on a flat background,
   a hairline progress line fills beneath it, then two panels slide apart to reveal the page.
   Colours come from the theme variables, so it matches dark (default) and light with no flash. */
const DURATION = 1500;

export default function SplashLoader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduce ? 400 : DURATION;
    const t1 = setTimeout(() => setLeaving(true), wait);
    const t2 = setTimeout(() => setDone(true), wait + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (done) return null;

  return (
    <div className={"splash" + (leaving ? " leaving" : "")} aria-hidden="true">
      <div className="splash-panel top" />
      <div className="splash-panel bottom" />
      <div className="splash-center">
        <div className="splash-brand">
          <img src="/icon.png" alt="" width="56" height="56" draggable="false" />
          <span>NIJANEESH<b>CHEF</b></span>
        </div>
        <div className="splash-line"><i style={{ animationDuration: DURATION + "ms" }} /></div>
      </div>
    </div>
  );
}
