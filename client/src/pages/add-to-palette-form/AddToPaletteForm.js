import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Loading } from "../../components/Loading";

export function AddToPaletteForm() {
  const [colourPalettes, setColourPalettes] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [colourGroups, setColourGroups] = useState(null);
  const [selectedColourGroup, setSelectedColourGroup] = useState(null);

  const addColourGroupToPalette = (colourPalette, colourGroup) => {
    fetch(`/colour_palettes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ colourPalette, colourGroup }),
    }).then((res) => console.log("form submitted"));
  };
  useEffect(() => {
    fetch(`/colour_palettes`)
      .then((res) => res.json())
      .then((serverResponse) =>
        setColourPalettes(serverResponse.colourPalettes)
      );

    fetch(`/colour_groups`)
      .then((res) => res.json())
      .then((serverResponse) => setColourGroups(serverResponse.colourGroups));
  }, []);

  return colourPalettes && colourGroups ? (
    <div className="add-to-palette-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addColourGroupToPalette(selectedPalette, selectedColourGroup);
        }}
      >
        <h2>Add to Palette Form</h2>
        <label>Palette</label>
        <select onChange={(e)=> setSelectedPalette(e.target.value)}>
          <option className="default-palette-option" value={null}>
            --- Choose a palette ---
          </option>
          {colourPalettes.map((palette, index) => {
            return <option key={index}>{palette.name}</option>;
          })}
        </select>

        <label>Colour Group</label>
        <select onChange={(e) => setSelectedColourGroup(e.target.value)}>
          <option className="default-palette-option" value={null}>
            --- Choose a colour group ---
          </option>
          {colourGroups.map((colourGroup, index) => {
            return <option key={index}>{colourGroup.name}</option>;
          })}
        </select>

        <button>Submit</button>
      </form>
    </div>
  ) : (
    <Loading />
  );
}
