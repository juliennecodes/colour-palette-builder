import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/colour-palettes">
            Colour Palettes
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/colours">
            Colours
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
