import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink exact to="/create-new-colour-palette">
            Create New Colour Palette
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/">
            Colour Palettes
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/delete-colour-palette">
            Delete Colour Palette
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/create-new-colour-group">
            Create New Colour Group
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/colour-groups">
            Colour Groups
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/delete-colour-group">
            Delete Colour Group
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
