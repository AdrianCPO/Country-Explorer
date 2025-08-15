import { Outlet, Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../styles/App.css";

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Hoppa till innehåll
      </a>

      <header className="container siteHeader">
        <Link to="/" className="brand">
          Country Explorer
        </Link>
      </header>

      <Navbar />

      <main id="main" className="container siteMain">
        <Outlet />
      </main>
    </>
  );
}
