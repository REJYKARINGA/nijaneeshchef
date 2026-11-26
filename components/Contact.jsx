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
            <div className="method"><div><small>Phone</small>9995099969</div><button className="copy" type="button" onClick={() => copy("9995099969")}>Copy</button></div>
            <div className="method"><div><small>Email</small>nijaneesh@gmail.com</div><button className="copy" type="button" onClick={() => copy("nijaneesh@gmail.com")}>Copy</button></div>
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
