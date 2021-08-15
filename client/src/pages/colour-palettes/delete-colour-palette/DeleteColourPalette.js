import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components/Loading";

export function DeleteColourPalette() {
  const [colourPalettes, setColourPalettes] = useState(null);
  const [toBeDeletedColourPaletteId, setToBeDeletedColourPaletteId] =
    useState(null);

  let history = useHistory();

  useEffect(() => {
    fetch(`/colour_palettes`)
      .then((res) => res.json())
      .then((serverResponse) =>
        setColourPalettes(serverResponse.colourPalettes)
      );
  }, []);

  const deleteColourPalette = (colourPaletteId) => {
    fetch(`/colour_palettes/${colourPaletteId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => history.push(`/`));
  };

  return (
    <div className="delete-colour-palette">
      <h1>Delete Colour Palette</h1>

      {colourPalettes ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteColourPalette(toBeDeletedColourPaletteId);
          }}
        >
          <select
            onChange={(e) => setToBeDeletedColourPaletteId(e.target.value)}
          >
            <option>--- Choose palette to delete ---</option>
            {colourPalettes.map((colourPalette, index) => {
              return (
                <option key={index} value={colourPalette.id}>
                  {colourPalette.name}
                </option>
              );
            })}
          </select>
          <button>Delete colour palette</button>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
}
