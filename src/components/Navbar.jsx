import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/countries">Länder</NavLink>
        </li>
        <li>
          <NavLink to="/about">Om sidan</NavLink>
        </li>
      </ul>
    </nav>
  );
};
