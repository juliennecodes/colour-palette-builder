import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import "./CreateNewColourPalette.css";

export function CreateNewColourPalette() {
  const [newColourPalette, setNewColourPalette] = useState({
    colourGroups: [],
  });
  const [colourGroups, setColourGroups] = useState(null);
  let history = useHistory();

  const submitForm = (newColourPalette) => {
    fetch(`/colour_palettes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newColourPalette }),
    }).then((res) => history.push(`/`));
  };

  useEffect(() => {
    fetch(`/colour_groups`)
      .then((res) => res.json())
      .then((serverResponse) => setColourGroups(serverResponse.colourGroups));
  }, []);

  return colourGroups ? (
    <div className="new-colour-palette-page">
      <h1 className="new-colour-palette-page-heading">
        New Colour Palette Form
      </h1>
      <form
        className="new-colour-form-name-input"
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
    </div>
  ) : (
    <Loading />
  );
}

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
        className="select-colour-group-button"
        onClick={() => {
          setSelected(true);
          addToColourPalette(colourGroup);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      </button>
    );
  };

  const RemoveButton = () => {
    return (
      <button
        className="select-colour-group-button"
        onClick={() => {
          setSelected(false);
          removeFromColourPalette(colourGroup);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      </button>
    );
  };

  return (
    <div className="colour-group" key={index}>
      <div
        className="deselect-overlay"
        style={
          selected
            ? { backgroundColor: "hsla(0, 0%, 0%, .3)" }
            : { backgroundColor: "hsla(0, 0%, 0%, 0)" }
        }
      ></div>
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
