"use client";
import { useEffect, useRef, useState } from "react";

const EXTRA = ["Freelance work", "Something else"];
const WA_NUMBER = "919995099969";

export default function Contact({ areaNames }) {
  const options = [...areaNames, ...EXTRA];
  const [mode, setMode] = useState("wa"); // "wa" = WhatsApp (the default), "email"
  const [interest, setInterest] = useState(options[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState({ n: "", p: "", m: "" });
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
    tm.current = setTimeout(() => setToast(""), 2200);
  };
  const copy = async (t) => {
    try { await navigator.clipboard.writeText(t); say("Copied"); }
    catch { say("Select the text and copy it manually"); }
  };

  const switchMode = (m) => { setMode(m); setSent(false); setDraft(""); };

  const submit = async (e) => {
    e.preventDefault();
    const n = name.trim(), p = phone.trim(), m = msg.trim(), s = subject.trim() || `${interest} enquiry`;
    const okPhone = p.replace(/\D/g, "").length >= 8;
    setErrs({
      n: n ? "" : "Enter your name.",
      p: okPhone ? "" : "Enter your phone number so I can reply.",
      m: m.length >= 10 ? "" : "Write at least 10 characters so I know how to help.",
    });
    if (!n || !okPhone || m.length < 10) return;
    setSent(false);

    if (mode === "wa") {
      const text = `*New enquiry from the website*\n\nName: ${n}\nPhone: ${p}\nSubject: ${s}\nInterested in: ${interest}\nMessage: ${m}`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      say("Opening WhatsApp. Press send there to share your message.");
      const a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      document.body.appendChild(a); a.click(); a.remove();
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/nijaneesh@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: s,
          _template: "table",
          _captcha: "false",
          Name: n,
          Phone: p,
          Subject: s,
          Interest: interest,
          Message: m,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false") throw new Error("send failed");
      setSent(true);
      setName(""); setPhone(""); setSubject(""); setMsg(""); setDraft("");
      say("Thank you. Your message has been sent.");
    } catch {
      setDraft(`Subject: ${s}\n\nHello Nijaneesh,\n\n${m}\n\nRegards,\n${n}\n${p}`);
      say("Could not send. Copy the message and email nijaneesh@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="wrap">
          <div>
            <div className="cimg"><img src="/img/contact1.png" alt="Contact" onError={(e) => (e.currentTarget.parentNode.style.display = "none")} /></div>
            <h2>Let’s plan your next meal</h2>
            <p className="sub">Planning a family meal, a celebration or a menu for your guests? Call, write, or draft a message here and let’s talk food.</p>
            <div className="gt-cards">
              <div className="gt-card">
                <a className="gt-main" href="tel:+919995099969">
                  <span className="gt-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="#16A34A" stroke="#16A34A" strokeWidth="1" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg></span>
                  <span className="gt-txt"><small>Phone</small>+91 9995099969</span>
                  <span className="gt-go" aria-hidden="true">&rarr;</span>
                </a>
                <button className="copy" type="button" onClick={() => copy("+91 9995099969")}>Copy</button>
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
            <div className="ct-tabs" role="tablist" aria-label="How to send your message">
              <button type="button" role="tab" aria-selected={mode === "wa"} className="ct-tab" onClick={() => switchMode("wa")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.200 14c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.200c.1.200 0 .4 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.500.300.1.200.1.800-.1 1.400z" /></svg>
                WhatsApp
              </button>
              <button type="button" role="tab" aria-selected={mode === "email"} className="ct-tab" onClick={() => switchMode("email")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#EA4335" aria-hidden="true"><path d="M24 4.5v15c0 .825-.675 1.5-1.5 1.5H18V9.75l-6 5.25-6-5.25V21H1.5C.675 21 0 20.325 0 19.5v-15c0-.825.675-1.5 1.5-1.5h.75L12 11.25 21.75 3h.75c.825 0 1.5.675 1.5 1.5z" /></svg>
                Email
              </button>
            </div>
            <label htmlFor="fn">Your name<input id="fn" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /><span className="err">{errs.n}</span></label>
            <label htmlFor="fp">Phone number<input id="fp" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><span className="err">{errs.p}</span></label>
            <label htmlFor="fs">Subject<input id="fs" value={subject} placeholder={`${interest} enquiry`} onChange={(e) => setSubject(e.target.value)} /></label>
            <label htmlFor="ft">I’m interested in
              <select id="ft" value={interest} onChange={(e) => setInterest(e.target.value)}>
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label htmlFor="fm">Message<textarea id="fm" value={msg} onChange={(e) => setMsg(e.target.value)} /><span className="err">{errs.m}</span></label>
            <button className={"btn primary" + (mode === "wa" ? " wa-send" : "")} type="submit" disabled={sending} style={{ justifyContent: "center" }}>
              {mode === "wa" ? "Share to WhatsApp" : sending ? "Sending..." : "Send by email"}
            </button>
            <div className={"output" + (sent || draft ? " show" : "")} role="status">{sent ? "Thank you. Your message has been sent. I will get back to you soon." : draft}</div>
            <button className="btn ghost" type="button" hidden={!draft} style={{ justifyContent: "center" }} onClick={() => copy(draft)}>Copy message to email it</button>
          </form>
        </div>
      </section>
      <div className={"toast" + (toast ? " show" : "")} role="status">{toast}</div>
    </>
  );
}
