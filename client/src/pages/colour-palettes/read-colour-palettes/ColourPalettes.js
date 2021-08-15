import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ColourPalettes() {
  const [colourPalettes, setColourPalettes] = useState(null);

  useEffect(() => {
    fetch(`/colour_palettes`)
      .then((res) => res.json())
      .then((serverResponse) =>
        setColourPalettes(serverResponse.colourPalettes)
      );
  }, []);

  const ColourPalettes = () => {
    return (
      <ul>
        {colourPalettes.map((colourPalette, index) => {
          return (
            <li key={index}>
              <Link to={`/colour-palettes/${colourPalette.id}`}>
                {colourPalette.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="colour-palettes">
      <h1>Colour Palettes</h1>
      {colourPalettes && <ColourPalettes />}
    </div>
  );
}
