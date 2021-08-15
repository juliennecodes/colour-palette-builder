import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateNewColourPalette.css";

export function CreateNewColourPalette() {
  const [newColourPalette, setNewColourPalette] = useState({
    name: null,
    colourGroups: [],
  });
  let history = useHistory();

  const [colourGroups, setColourGroups] = useState(null);

  useEffect(() => {
    fetch(`/colour_groups`)
      .then((res) => res.json())
      .then((serverResponse) => setColourGroups(serverResponse.colourGroups));
  }, []);

  const submitForm = (newColourPalette) => {
    fetch(`/colour_palettes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newColourPalette }),
    }).then((res) => history.push(`/`));
  };

  const NewColourPaletteForm = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newColourPalette);
        }}
      >
        <label htmlFor="input-field">Name</label>
        <input
          onChange={(e) =>
            setNewColourPalette({ ...newColourPalette, name: e.target.value })
          }
          name="input-field"
        ></input>
        <button>Create new colour palette</button>
      </form>
    );
  };

  const SelectedColourGroups = () => {
    return (
      <div className="selected-colour-groups">
        <h2>Selected Colour Groups </h2>
        {newColourPalette.colourGroups.map((colourGroup, index) => {
          return (
            <div className="colour-group" key={index}>
              <div className="colour-group-colour-swatches">
                {colourGroup.colours.map((colour, index) => {
                  return (
                    <div
                      className="colour-group-colour-swatch"
                      key={index}
                      style={{
                        backgroundColor: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const ColourGroupChoices = () => {
    return (
      <div className="colour-group-choices">
        <h2>Colour Group Choices </h2>
        {colourGroups.map((colourGroup, index) => {
          return (
            <ColourGroupChoice
              colourGroup={colourGroup}
              index={index}
              newColourPalette={newColourPalette}
              setNewColourPalette={setNewColourPalette}
            />
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="new-colour-palette-page">
      <h1>New Colour Palette Form</h1>
      <NewColourPaletteForm />
      <SelectedColourGroups />
      {colourGroups && <ColourGroupChoices />}
    </div>
  );
}
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
function ColourGroupChoice({
  colourGroup,
  index,
  newColourPalette,
  setNewColourPalette,
}) {
  const [selected, setSelected] = useState(false);

  const addToColourPalette = (colourGroup) => {
    const updatedColourGroups = [...newColourPalette.colourGroups];
    updatedColourGroups.push(colourGroup);
    setNewColourPalette({
      ...newColourPalette,
      colourGroups: updatedColourGroups,
    });
  };

  const removeFromColourPalette = (colourGroup) => {
    const updatedColourGroups = [...newColourPalette.colourGroups].filter(
      (cg) => cg.name !== colourGroup.name
    );
    setNewColourPalette({
      ...newColourPalette,
      colourGroups: updatedColourGroups,
    });
  };

  const AddButton = () => {
    return (
      <button
        onClick={() => {
          setSelected(true);
          addToColourPalette(colourGroup);
        }}
      >
        Add To Colour Palette
      </button>
    );
  };

  const RemoveButton = () => {
    return (
      <button
        onClick={() => {
          setSelected(false);
          removeFromColourPalette(colourGroup);
        }}
      >
        Remove From Colour Palette
      </button>
    );
  };

  return (
    <div className="colour-group" key={index}>
      <p>{colourGroup.name}</p>
      <div className="colour-group-colour-swatches">
        {colourGroup.colours.map((colour, index) => {
          return (
            <div
              className="colour-group-colour-swatch"
              key={index}
              style={{
                backgroundColor: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,
              }}
            ></div>
          );
        })}
      </div>
      {selected ? <RemoveButton /> : <AddButton />}
    </div>
  );
}
