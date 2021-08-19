import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateNewColourGroup.css";
// import { AddSVG } from "../../../components/AddSVG";

export function CreateNewColourGroup() {
  const [newColourGroup, setNewColourGroup] = useState({
    name: null,
    colours: [],
  });
  let history = useHistory();

  const submitForm = (newColourGroup) => {
    fetch(`/colour_groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newColourGroup }),
    }).then((res) => history.push(`/`));
  };

  return (
    <form
      className="new-colour-group-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(newColourGroup);
      }}
    >
      <h1 className="new-colour-group-form-heading">New Colour Group Form</h1>
      <NewColourGroupNameInput
        newColourGroup={newColourGroup}
        setNewColourGroup={setNewColourGroup}
        submitForm={submitForm}
      />

      <NewColourGroup
        newColourGroup={newColourGroup}
        setNewColourGroup={setNewColourGroup}
        submitForm={submitForm}
      />

      <button className="submit-form-button">Submit new colour group</button>
    </form>
  );
}
// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
function NewColourGroupNameInput({ newColourGroup, setNewColourGroup }) {
  return (
    <div className="new-colour-group-form-name-input-div">
      <label
        className="new-colour-group-form-name-input-label"
        htmlFor="name-input"
      >
        Name:
      </label>
      <input
        className="new-colour-group-form-name-input"
        type="text"
        name="name-input"
        onChange={(e) =>
          setNewColourGroup({ ...newColourGroup, name: e.target.value })
        }
      ></input>
      <span className="new-colour-group-form-name-input-span"></span>
    </div>
  );
}

function NewColourGroup({ newColourGroup, setNewColourGroup }) {
  return (
    <div className="new-colour-group">
      <h2 className="new-colour-group-heading">Colour Group:</h2>
      <div className="colour-group-colour-swatches">
        {newColourGroup.colours.map((colour, index) => {
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
      <NewColourInput
        newColourGroup={newColourGroup}
        setNewColourGroup={setNewColourGroup}
      />
    </div>
  );
}

function NewColourInput({ newColourGroup, setNewColourGroup }) {
  const [newColour, setNewColour] = useState({});

  return (
    <div className="new-colour-input-div">
      <h2 className="new-colour-input-heading">New Colour Form</h2>
      <div className="labels-and-inputs">
        <div className="label-and-input">
          <label className="new-colour-input-label">hue:</label>
          <input
            type="number"
            className="new-colour-input-input"
            min="0"
            max="360"
            onChange={(e) =>
              setNewColour({ ...newColour, hue: e.target.value })
            }
          ></input>
          <span className="new-colour-input-span"></span>
        </div>

        <div className="label-and-input">
          <label className="new-colour-input-label">saturation:</label>
          <input
            type="number"
            className="new-colour-input-input"
            min="0"
            max="100"
            onChange={(e) =>
              setNewColour({ ...newColour, saturation: e.target.value })
            }
          ></input>
          <span className="new-colour-input-span"></span>
        </div>

        <div className="label-and-input">
          <label className="new-colour-input-label">lightness:</label>
          <input
            type="number"
            className="new-colour-input-input"
            min="0"
            max="100"
            onChange={(e) =>
              setNewColour({ ...newColour, lightness: e.target.value })
            }
          ></input>
          <span className="new-colour-input-span"></span>
        </div>
      </div>

      <div className="new-colour-preview-div">
        <div
          className="new-colour-preview"
          style={{
            backgroundColor: `hsl(${newColour.hue}, ${newColour.saturation}%, ${newColour.lightness}%)`,
          }}
        ></div>
      </div>

      <button
        className="add-new-colour-button"
        onClick={(e) => {
          e.preventDefault();
          const updatedNewColourGroupColours = [...newColourGroup.colours];
          updatedNewColourGroupColours.push(newColour);
          setNewColourGroup({
            ...newColourGroup,
            colours: updatedNewColourGroupColours,
          });
          clearInputValues();
        }}
      >
        Add New Colour
      </button>
    </div>
  );
}

function clearInputValues() {
  const inputs = Array.from(
    document.querySelectorAll(".new-colour-input-input")
  );
  for (const input of inputs) {
    input.value = null;
  }
}
