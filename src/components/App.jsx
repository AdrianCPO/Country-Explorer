import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import "../styles/App.css";

function AppShell({ children }) {
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
      <main id="main" className="container" style={{ paddingBottom: 24 }}>
        {children}
      </main>
    </>
  );
}

export function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
