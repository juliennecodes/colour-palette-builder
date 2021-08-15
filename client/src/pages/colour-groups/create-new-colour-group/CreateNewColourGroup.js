import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateNewColourGroup.css";

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

  const NewColourGroupForm = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newColourGroup);
        }}
      >
        <label>Name</label>
        <input
          type="text"
          onChange={(e) =>
            setNewColourGroup({ ...newColourGroup, name: e.target.value })
          }
        ></input>

        <NewColourGroup />

        <button>Submit new colour group</button>
      </form>
    );
  };

  const NewColourGroup = () => {
    return (
      <div className="new-colour-group">
        <h2>Colour Group</h2>
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
      </div>
    );
  };

  const NewColourForm = () => {
    const [newColour, setNewColour] = useState({});

    return (
      <form
        className="new-colour-form"
        onSubmit={(e) => {
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
        <div className="label-and-input">
          <label>hue</label>
          <input
            type="number"
            className="new-colour-input"
            onChange={(e) =>
              setNewColour({ ...newColour, hue: e.target.value })
            }
          ></input>
        </div>

        <div className="label-and-input">
          <label>saturation</label>
          <input
            type="number"
            className="new-colour-input"
            onChange={(e) =>
              setNewColour({ ...newColour, saturation: e.target.value })
            }
          ></input>
        </div>

        <div className="label-and-input">
          <label>lightness</label>
          <input
            type="number"
            className="new-colour-input"
            onChange={(e) =>
              setNewColour({ ...newColour, lightness: e.target.value })
            }
          ></input>
        </div>

        <div className="new-colour-preview-div">
          <p>Preview</p>
          <div
            className="new-colour-preview"
            style={{
              backgroundColor: `hsl(${newColour.hue}, ${newColour.saturation}%, ${newColour.lightness}%)`,
            }}
          ></div>
        </div>

        <button>Add new colour to group</button>
      </form>
    );
  };

  return (
    <div className="new-colour-group-form-page">
      <div className="new-colour-group-form-div">
        <h1>New Colour Group Form</h1>
        <NewColourGroupForm />
      </div>

      <div className="new-colour-form-div">
        <h2>New Colour Form</h2>
        <NewColourForm />
      </div>
    </div>
  );
}

function clearInputValues() {
  const inputs = Array.from(document.querySelectorAll(".new-colour-input"));
  for (const input of inputs) {
    input.value = null;
  }
}
