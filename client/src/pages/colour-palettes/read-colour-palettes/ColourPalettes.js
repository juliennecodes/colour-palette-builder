import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../../components/Loading";

export function ColourPalettes() {
  const [colourPalettes, setColourPalettes] = useState(null);

  useEffect(() => {
    fetch(`/colour_palettes`)
      .then((res) => res.json())
      .then((serverResponse) => setColourPalettes(serverResponse.colourPalettes));
  }, []);

  return (
    <div className="colour-palettes">
      <h1>Colour Palettes</h1>
      {colourPalettes ? (
        <ul>
          {colourPalettes.map((colourPalette, index) => {
            return (
              <li key={index}>
                <Link to={`/colour-palettes/${colourPalette.id}`}>{colourPalette.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
}
