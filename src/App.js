import { useState, useEffect } from "react";
import { ReactComponent as Logo } from './NMC logo.svg';
import { ReactComponent as Mt } from './Mountain River Line Art.svg';
import "./App.css";

const PAGES = ["home", "services", "contact"];
const LABEL = { home: "Home", services: "Services", contact: "Contact" };
const FORMSPREE_URL = "https://formspree.io/f/xgakddoy";

function Nav({ page, go }) {
  return (
    <header className="nav">
      <button className="logo" onClick={() => go("home")} aria-label="NMC logo">
        <Logo className="logoHome" />
      </button>
      <nav aria-label="Main">
        <ul>
          {PAGES.map((p) => (
            <li key={p}>
              <button onClick={() => go(p)} aria-current={page === p ? "page" : undefined}>{LABEL[p]}</button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="foot">
      <button className="logo" onClick={() => go("home")} aria-label="NMC logo">
        <Logo className="logoFoot" />
      </button>
      <nav aria-label="Footer">
        {PAGES.map((p) => (
          <button key={p} className="lk" onClick={() => go(p)}>{LABEL[p]}</button>
        ))}
      </nav>
      {/* <div className="soc"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Google">G</a></div> */}
    </footer>
  );
}

// const reviews = [
//   { t: "Quick, professional and clean work. My windshield looks brand new.", n: "Daniel M." },
//   { t: "Super easy process and the team kept me updated the whole way.", n: "Colin B." },
//   { t: "On time and very professional. Would absolutely use again.", n: "Patrick Y." },
// ];

function Home({ go }) {
  return (
    <>
      <section className="hero tall">
        <h1>Clear Views Ahead</h1>
        <p>Professional auto glass repair &amp; replacement</p>
        <button className="btn" onClick={() => go("contact")}>Get in touch</button>
      </section>
      <section className="sec">
        <div className="about">
          <div>
            <span className="tag">About us</span>
            <h2>Driven by Clarity. Built for Safety.</h2>
            <p>Proudly serving MD, VA, and DC, we provide reliable, high-quality auto glass repair and replacement services to keep you safe on the road. We make the process simple while keeping a focus on precision and customer satisfaction.</p>
            <p><button className="btn dark" onClick={() => go("services")}>Our services</button></p>
          </div>
          <div>
            <Mt className="mt-home" aria-label="Mountain line illustration" />
          </div>
        </div>
      </section>
      <section className="stats">
        <small>AT THE NMC</small>
        <div className="row">
          <div><b>100+</b><span>VEHICLES SERVICED</span></div>
          <div><b>5 STAR</b><span>GOOGLE RATED</span></div>
          <div><b>100%</b><span>CUSTOMER FOCUSED</span></div>
        </div>
      </section>
      {/* <section className="sec">
        <div className="rev">
          <header>
            <div><span className="tag">Google reviews</span><h2>What Our Customers Say</h2></div>
            <a href="#" className="btn dark" style={{ border: 0, padding: 0 }}>View all reviews →</a>
          </header>
          <div className="cards">
            {reviews.map((r) => (
              <div className="card" key={r.n}><i aria-label="5 stars">★★★★★</i><p>“{r.t}”</p><cite>{r.n}</cite></div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}

function Services({ go }) {
  return (
    <>
      <section className="hero mid">
        <h1>Our Services</h1>
        <p>Repair. Replacements.</p>
      </section>

      <section className="svcSection">
        {/* Desktop line */}
        <svg className="svcLines svcDesk" viewBox="0 0 1440 620" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M-20 30C300 90 700 120 1000 130C1150 135 1180 150 1120 170C1050 195 1100 215 1250 225C1350 232 1440 236 1500 240" />
          <path d="M1500 330C1200 375 800 410 480 440C300 457 230 480 300 500C360 518 420 520 360 548C300 575 150 580 -20 590" />
        </svg>

        {/* Mobile line (your exported file) */}
        <svg className="svcLines svcMob" viewBox="0 0 1440 1452" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M-190 1.896C688 296.896 1236 195.896 975.5 296.896C797.797 365.794 1335.5 423.896 1335.5 423.896C1335.5 423.896 2063 467.896 2063 665.396C2063 764.896 1214.5 1021.4 902 1086.9C589.5 1152.4 -123.5 1236.4 245 1287.4C613.5 1338.4 -22 1470.4 -246 1446.9" />
        </svg>

        <article className="svcCard svcLeft">
          <h3>Crack &amp; Chip Filling</h3>
          <p>Quick, reliable repairs that seal minor chips and cracks, helping prevent further damage and extending the life of your glass.</p>
        </article>

        <article className="svcCard svcRight">
          <h3>Full Glass Replacement</h3>
          <p>When repair isn’t an option, we’ll get you back on the road with a complete glass replacement. We provide precise installation for a safe, secure and finish.</p>
        </article>
      </section>

      <section className="cta">
        <h3>Not Sure What You Need?</h3>
        <p>Send us a few details and we’ll help you find the right solution.</p>
        <button className="btn" onClick={() => go("contact")}>Get in touch</button>
      </section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    name: "", phone: "", email: "", vehicle: "", service: "", details: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...f,
          _subject: `New glass request from ${f.name}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="hero mid sunset">
        <div><h1>Get in Touch</h1><p>We are here to help</p></div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="form">
          {sent ? (
            <div className="ok" role="status">
              <h2>Request sent</h2>
              <p>Thanks, {f.name || "there"}. We’ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2>Send Us a Message</h2>
              <p>Fill out this form below and we will get back to you as soon as possible.</p>

              <label htmlFor="n">Full Name*</label>
              <input id="n" required value={f.name} onChange={set("name")} />

              <label htmlFor="p">Phone*</label>
              <input id="p" type="tel" required value={f.phone} onChange={set("phone")} />

              <label htmlFor="e">Email*</label>
              <input id="e" type="email" required value={f.email} onChange={set("email")} />

              <label htmlFor="v">Vehicle Year, Make, and Model*</label>
              <input id="v" required value={f.vehicle} onChange={set("vehicle")} />

              <label htmlFor="s">Service Needed*</label>
              <select id="s" required value={f.service} onChange={set("service")}>
                <option value="">Select a service</option>
                <option>Crack &amp; chip filling</option>
                <option>Full glass replacement</option>
                <option>Not sure</option>
              </select>

              <label htmlFor="d">Additional Details</label>
              <textarea
                id="d"
                placeholder="Tell us more about your request…"
                value={f.details}
                onChange={set("details")}
              />

              {error && <p role="alert" className="formError">{error}</p>}

              <p style={{ margin: "20px 0 0" }}>
                <button type="submit" className="btn solid" disabled={sending}>
                  {sending ? "Sending…" : "Submit request →"}
                </button>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const go = (p) => setPage(p);
  useEffect(() => { window.scrollTo(0, 0); document.title = `NMC Auto Glass | ${LABEL[page]}`; }, [page]);
  return (
    <div className="nmc">
      <div style={{ position: "relative" }}>
        <Nav page={page} go={go} />
        <main>
          {page === "home" && <Home go={go} />}
          {page === "services" && <Services go={go} />}
          {page === "contact" && <Contact />}
        </main>
      </div>
      <Footer go={go} />
    </div>
  );
}
