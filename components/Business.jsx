"use client";
import { useRef, useState } from "react";

export default function Business({ areas }) {
  const [filter, setFilter] = useState("all");
  const [cur, setCur] = useState(null);
  const dlg = useRef(null);

  const openArea = (v) => {
    setCur(v);
    window.dispatchEvent(new CustomEvent("area-selected", { detail: v.name }));
    if (dlg.current?.showModal) dlg.current.showModal();
    else dlg.current?.setAttribute("open", "");
  };
  const close = () => {
    if (dlg.current?.close) dlg.current.close();
    else dlg.current?.removeAttribute("open");
  };

  return (
    <>
      <section id="business">
        <div className="wrap">
          <p className="label kicker">Business</p>
          <h2 className="big">What I Do</h2>
          <p className="sub">Select any area for details, or filter by type.</p>
          <div className="filters" role="group" aria-label="Filter business areas">
            {[["all", "All"], ["hospitality", "Hospitality"], ["retail", "Retail"]].map(([f, l]) => (
              <button key={f} className="chip" type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{l}</button>
            ))}
          </div>
          <div className="services">
            {areas.map((v) => (
              <button key={v.name} className="svc" type="button" hidden={!(filter === "all" || v.cat === filter)} onClick={() => openArea(v)}>
                <span className="pic"><img src={v.img} alt={v.name} loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} /></span>
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </button>
            ))}
          </div>
          <p className="exp">7+ Years of Experience</p>
        </div>
      </section>

      <dialog ref={dlg} aria-labelledby="dTitle" onClick={(e) => e.target === dlg.current && close()}>
        <div className="in">
          <div className="hero">{cur && <img key={cur.img} src={cur.img} alt={cur.name} onError={(e) => (e.currentTarget.style.display = "none")} />}</div>
          <div className="txt">
            <span className="label" style={{ color: "var(--accent)", fontSize: ".8rem" }}>{cur?.tag}</span>
            <h3 id="dTitle">{cur?.name}</h3>
            <p>{cur?.text}</p>
            <ul>{cur?.pts.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="row">
              <a className="btn primary" href="#contact" onClick={close}>Ask about this</a>
              <button className="btn ghost" type="button" onClick={close}>Close</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
