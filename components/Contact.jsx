"use client";
import { useEffect, useRef, useState } from "react";

const EXTRA = ["Freelance work", "Something else"];

export default function Contact({ areaNames }) {
  const options = [...areaNames, ...EXTRA];
  const [interest, setInterest] = useState(options[0]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [errs, setErrs] = useState({ n: "", m: "" });
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");
  const tm = useRef();

  // picking an area in the "What I Do" dialog pre-selects it here
  useEffect(() => {
    const h = (e) => setInterest(e.detail);
    window.addEventListener("area-selected", h);
    return () => window.removeEventListener("area-selected", h);
  }, []);

  const say = (m) => {
    setToast(m);
    clearTimeout(tm.current);
    tm.current = setTimeout(() => setToast(""), 1900);
  };
  const copy = async (t) => {
    try { await navigator.clipboard.writeText(t); say("Copied"); }
    catch { say("Select the text and copy it manually"); }
  };

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim(), m = msg.trim();
    setErrs({ n: n ? "" : "Enter your name.", m: m.length >= 10 ? "" : "Write at least 10 characters so I know how to help." });
    if (!n || m.length < 10) return;
    setDraft(`Subject: ${interest} enquiry from ${n}\n\nHello Nijaneesh,\n\n${m}\n\nRegards,\n${n}`);
    say("Message ready. Copy it and email nijaneesh@gmail.com");
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap">
          <div>
            <div className="cimg"><img src="https://www.nijaneeshchef.com/wp-content/uploads/2024/11/contact1.png" alt="Contact" onError={(e) => (e.currentTarget.parentNode.style.display = "none")} /></div>
            <h2>Contact with me</h2>
            <p className="sub">Call, write, or draft a message here. Freelance work and partnerships are welcome.</p>
            <div className="gt-cards">
              <div className="gt-card">
                <a className="gt-main" href="tel:+919995099969">
                  <span className="gt-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg></span>
                  <span className="gt-txt"><small>Phone</small>9995099969</span>
                  <span className="gt-go" aria-hidden="true">&rarr;</span>
                </a>
                <button className="copy" type="button" onClick={() => copy("9995099969")}>Copy</button>
              </div>
              <div className="gt-card">
                <a className="gt-main" href="mailto:nijaneesh@gmail.com">
                  <span className="gt-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4335" aria-hidden="true"><path d="M24 4.5v15c0 .825-.675 1.5-1.5 1.5H18V9.75l-6 5.25-6-5.25V21H1.5C.675 21 0 20.325 0 19.5v-15c0-.825.675-1.5 1.5-1.5h.75L12 11.25 21.75 3h.75c.825 0 1.5.675 1.5 1.5z" /></svg></span>
                  <span className="gt-txt"><small>Email</small>nijaneesh@gmail.com</span>
                  <span className="gt-go" aria-hidden="true">&rarr;</span>
                </a>
                <button className="copy" type="button" onClick={() => copy("nijaneesh@gmail.com")}>Copy</button>
              </div>
            </div>
          </div>
          <form onSubmit={submit} noValidate>
            <label htmlFor="fn">Your name<input id="fn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /><span className="err">{errs.n}</span></label>
            <label htmlFor="ft">I’m interested in
              <select id="ft" value={interest} onChange={(e) => setInterest(e.target.value)}>
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label htmlFor="fm">Message<textarea id="fm" value={msg} onChange={(e) => setMsg(e.target.value)} /><span className="err">{errs.m}</span></label>
            <button className="btn primary" type="submit" style={{ justifyContent: "center" }}>Write my message</button>
            <div className={"output" + (draft ? " show" : "")} role="status">{draft}</div>
            <button className="btn ghost" type="button" hidden={!draft} style={{ justifyContent: "center" }} onClick={() => copy(draft)}>Copy message to email it</button>
          </form>
        </div>
      </section>
      <div className={"toast" + (toast ? " show" : "")} role="status">{toast}</div>
    </>
  );
}
