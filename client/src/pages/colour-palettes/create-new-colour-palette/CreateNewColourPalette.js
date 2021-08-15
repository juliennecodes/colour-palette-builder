import { useState } from "react";
import { useHistory } from "react-router-dom";

export function CreateNewColourPalette() {
  const [newColourPalette, setNewColourPalette] = useState(null);
  let history = useHistory();

  const submitForm = (newColourPalette) => {
    fetch(`/colour_palettes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newColourPalette }),
    }).then((res) => history.push(`/`));
  };

  return (
    <div className="new-colour-palette">
      <h1>New Colour Palette Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newColourPalette);
        }}
      >
        <label htmlFor="input-field">Name</label>
        <input
          onChange={(e) => setNewColourPalette({...newColourPalette, name: e.target.value})}
          name="input-field"
        ></input>
        <button>Create new colour palette</button>
      </form>
    </div>
  );
}
