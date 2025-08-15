import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../styles/App.css";

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Hoppa till innehåll
      </a>
      <header className="container" style={{ paddingBlock: 16 }}>
        <Link
          to="/"
          style={{
            color: "var(--text)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Country Explorer
        </Link>
      </header>
      <Navbar />
      <main id="main" className="container" style={{ paddingBottom: 24 }}>
        <Outlet />
      </main>
    </>
  );
}
