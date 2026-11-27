const U = "/img/";

export const areas = [
  { name: "Pets", cat: "retail", img: U + "k.jpg", tag: "Retail",
    text: "A pet shop or pet store is an essential services retailer which sells animals and pet care resources to the public.",
    pts: ["Animals and pet care resources", "Essential services retail", "Sold to the public"] },
  { name: "House Boat", cat: "hospitality", img: U + "5801de8a69f88990c03eebb2678052b4.jpg", tag: "Hospitality",
    text: "Houseboats in Alappuzha are largely found on small inland rivers, lakes and streams, and in coastal harbours.",
    pts: ["Inland rivers, lakes and streams", "Coastal harbours", "Alappuzha backwaters"] },
  { name: "Hospitality", cat: "hospitality", img: U + "adasd.jpg", tag: "Hospitality",
    text: "The hospitality industry is unique because it relies so heavily on discretionary income and free time to provide services to customers.",
    pts: ["Depends on discretionary income", "Depends on customers' free time", "Service-led business"] },
  { name: "Tasty Dry Fruits", cat: "retail", img: U + "kk.jpg", tag: "Retail",
    text: "Leverage social media platforms to engage with customers and build community. Offer samples at local markets.",
    pts: ["Social media engagement", "Community building", "Samples at local markets"] },
  { name: "Lake Heaven Resort", cat: "hospitality", img: U + "sada.jpg", tag: "Hospitality",
    text: "People visit for holidays and day trips, typically staying in hotels at places in Alappuzha such as Lake Heaven Resort.",
    pts: ["Holidays and day trips", "Hotels for holidaymakers", "Alappuzha"] },
  { name: "Black Pepper Restaurant", cat: "hospitality", img: U + "aaa.jpg", tag: "Hospitality",
    text: "The restaurant industry is one of the largest components of the hospitality industry. It is focused on providing food services.",
    pts: ["Food service", "Part of hospitality", "Kitchen experience since 2005"] },
];

const rawJobs = [
  { n: "Muthoot Skychef", p: "Trivandrum", r: "Trainee", a: "2005-12-10", b: "2006-06-10" },
  { n: "Krishnatheeram Ayur Holy Beach Resort", p: "Varkala", r: "Apprentice", a: "2006-07-10", b: "2006-12-31" },
  { n: "BCG Harbour View", p: "Ernakulam", r: "Food & Beverage Production", a: "2007-11-12", b: "2009-12-21" },
  { n: "Taj Green Cove Resort", p: "Kovalam", r: "Food & Beverage Production", a: "2010-02-03", b: "2011-04-27" },
  { n: "South Park", p: "Trivandrum", r: "Food & Beverage Production", a: "2011-05-15", b: "2014-03-10" },
  { n: "Classie Avenue", p: "Trivandrum", r: "Food & Beverage Production", a: "2015-04-15", b: "2015-10-30" },
];

const D = (s) => new Date(s + "T00:00:00Z");
const months = (a, b) => Math.max(1, Math.round((b - a) / 2629800000));

export const dur = (m) => {
  const y = Math.floor(m / 12), r = m % 12;
  return ((y ? y + " yr " : "") + (r ? r + " mo" : "")).trim() || "1 mo";
};

const fmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

// newest first, with display strings prepared on the server
export const jobs = rawJobs
  .map((j) => {
    const m = months(D(j.a), D(j.b));
    return { ...j, m, dates: fmt.format(D(j.a)) + " – " + fmt.format(D(j.b)), dur: dur(m) };
  })
  .reverse();

export const totalMonths = jobs.reduce((t, j) => t + j.m, 0);
