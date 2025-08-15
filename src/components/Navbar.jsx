import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export const Navbar = () => {
  return (
    <nav className="Navbar" aria-label="Huvudmeny">
      <div className="container Navbar__inner">
        <ul className="Navbar__list">
          <li>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                isActive ? "Navbar__link is-active" : "Navbar__link"
              }
            >
              Länder
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "Navbar__link is-active" : "Navbar__link"
              }
            >
              Om sidan
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
