import { Link } from "react-router-dom";
import "../styles/About.css";

export const AboutView = () => {
  return (
    <main className="About container">
      <header className="About__hero" aria-labelledby="about-title">
        <div className="About__icon" aria-hidden="true">
          🌍
        </div>
        <h1 id="about-title" className="About__title">
          Country Explorer
        </h1>
        <p className="About__tagline">
          Demonstrerar API-hämtning, filtrering och tillgänglig, responsiv
          design.
        </p>

        <div className="About__cta">
          <Link className="Button Button--primary" to="/countries">
            Utforska länder
          </Link>
          <a className="Button Button--ghost" href="#features">
            Läs mer
          </a>
        </div>
      </header>

      <section id="features" className="About__card">
        <h2 className="About__sectionTitle">Vad innehåller appen?</h2>
        <ul className="About__features" role="list">
          <li className="About__feature">
            <span className="About__bullet" aria-hidden="true">
              ⚡
            </span>
            Snabb sökning och filtrering per region.
          </li>
          <li className="About__feature">
            <span className="About__bullet" aria-hidden="true">
              🧭
            </span>
            Mobil-först-layout med tydliga brytpunkter.
          </li>
          <li className="About__feature">
            <span className="About__bullet" aria-hidden="true">
              ♿
            </span>
            Tillgänglighet i fokus: semantik, fokusstil och skip-link.
          </li>
          <li className="About__feature">
            <span className="About__bullet" aria-hidden="true">
              🧩
            </span>
            Komponentspecifik CSS som återanvänder design-tokens.
          </li>
        </ul>
      </section>

      <section className="About__card About__tips">
        <h2 className="About__sectionTitle">Hur är sidan byggd?</h2>
        <dl className="About__meta">
          <div className="MetaRow">
            <dt>Teknik</dt>
            <dd>React + React Router</dd>
          </div>
          <div className="MetaRow">
            <dt>Stil</dt>
            <dd>CSS-variabler, mobil-först, tokens och komponent-CSS</dd>
          </div>
          <div className="MetaRow">
            <dt>API</dt>
            <dd>REST Countries (hämtning per kod och lista)</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};
