export default function Resume({ jobs }) {
  return (
    <section id="resume">
      <div className="wrap">
        <p className="label kicker">Resume</p>
        <h2 className="big">Experience</h2>
        <p className="sub">Food &amp; Beverage Production, 2005 to 2015.</p>
        <div className="list">
          {jobs.map((j) => (
            <div className="item" key={j.n}>
              <div><b>{j.n}</b><small>{j.r}, {j.p}</small></div>
              <time>{j.dates}</time>
              <span className="dur">{j.dur}</span>
            </div>
          ))}
        </div>
        <div className="edu">
          <div><b>B.Sc Hotel Management &amp; Catering Technology</b><span>Vinayaka Missions University, first class</span></div>
          <div><b>Higher Secondary</b><span>T.C.K Higher Secondary School, Padathalumoodu, Tamil Nadu</span></div>
          <div><b>SSLC</b><span>Evans High School, Parassala</span></div>
        </div>
      </div>
    </section>
  );
}
