const POINTS = [
  { icon: "❤", title: "Cooked with love", text: "Every dish is made fresh, with care and the same warmth I would put into a meal for my own family." },
  { icon: "🥗", title: "Healthy and balanced", text: "Working in a hospital dietary department has taught me to make food that is nourishing without losing flavour." },
  { icon: "👨‍👩‍👧", title: "Made for the whole family", text: "Mild for kids, full of taste for grown-ups, and comforting for elders. Something for every plate at the table." },
  { icon: "🎉", title: "Gatherings and celebrations", text: "From a quiet family dinner to a festive get-together, I will help you plan a menu everyone remembers." },
];

export default function Welcome() {
  return (
    <section id="kitchen">
      <div className="wrap">
        <p className="label kicker">Family-Friendly Chef</p>
        <h2 className="big">Welcome to My Kitchen</h2>
        <p className="tagline">Good Food, Happy Families, Beautiful Memories!</p>
        <p className="sub">Food is more than a meal. It is the reason families sit together, share stories and make memories. That is what I cook for.</p>
        <div className="points">
          {POINTS.map((p) => (
            <div className="point" key={p.title}>
              <span className="pi" aria-hidden="true">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <p className="closing">Let’s cook something wonderful together. <a href="#contact">Get in touch</a></p>
      </div>
    </section>
  );
}
