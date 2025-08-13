import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        <li>
          <NavLink to="/countries">Länder</NavLink>
        </li>
        <li>
          <NavLink to="/search">Sök</NavLink>
        </li>
      </ul>
    </nav>
  );
};
