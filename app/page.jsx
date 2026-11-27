import Chrome from "../components/Chrome";
import Intro from "../components/Intro";
import Stats from "../components/Stats";
import Welcome from "../components/Welcome";
import Business from "../components/Business";
import Resume from "../components/Resume";
import Contact from "../components/Contact";
import { areas, jobs, totalMonths } from "./data";

export default function Page() {
  return (
    <>
      <Chrome />
      <main id="main">
        <Intro />
        <Stats employers={jobs.length} areas={areas.length} months={totalMonths} />
        <Welcome />
        <Business areas={areas} />
        <Resume jobs={jobs} />
        <Contact areaNames={areas.map((a) => a.name)} />
      </main>
      <footer id="foot" style={{ backgroundImage: "url('https://www.nijaneeshchef.com/wp-content/uploads/2024/10/1eefc5567dc5c55f67ef6849b9235582.jpg')" }}>
        <div className="wrap">
          <span>Copyright © 2024 · Trivandrum, Kerala</span>
          <a className="powered" href="https://www.wishigrove.com" target="_blank" rel="noopener noreferrer"><span>Powered by</span><img src="/wishigrove-logo.png" alt="WishiGrove" height="26" /></a>
        </div>
      </footer>
    </>
  );
}
