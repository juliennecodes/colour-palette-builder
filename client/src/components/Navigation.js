import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/">
            Colour Palettes
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/colour-groups">
            Colour Groups
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/add-new-colours">
            Add New Colours
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
