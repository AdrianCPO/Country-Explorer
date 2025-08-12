import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        <li>
          <NavLink to="/country">Länder</NavLink>
        </li>
      </ul>
    </nav>
  );
};
