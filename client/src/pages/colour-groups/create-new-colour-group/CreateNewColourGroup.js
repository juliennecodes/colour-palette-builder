import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateNewColourGroup.css";

export function CreateNewColourGroup() {
  const [newColourGroup, setNewColourGroup] = useState([]);
  let history = useHistory();

  const submitForm = (newColourGroup) => {
    fetch(`/colour_groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newColourGroup }),
    }).then((res) => history.push(`/`));
  };

  return (
    <div className="new-colour-group-form">
      <h1>New Colour Group Form</h1>

      <NewColourForm
        newColourGroup={newColourGroup}
        setNewColourGroup={setNewColourGroup}
      />

      <NewColourGroup newColourGroup={newColourGroup} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(newColourGroup);
        }}
      >
        <button>Submit new colour group</button>
      </form>
    </div>
  );
}

function clearInputValues() {
  const inputs = Array.from(document.querySelectorAll(".new-colour-input"));
  for (const input of inputs) {
    input.value = null;
  }
}

function NewColourForm({newColourGroup, setNewColourGroup}) {
  const [newColour, setNewColour] = useState({});
  return (
    <>
      <form
        className="new-colour-form"
        onSubmit={(e) => {
          e.preventDefault();
          const updatedNewColourGroup = [...newColourGroup];
          updatedNewColourGroup.push(newColour);
          setNewColourGroup(updatedNewColourGroup);
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

        <button>Add new colour to group</button>
      </form>
    </>
  );
}

function NewColourGroup({newColourGroup}) {
  return (
    <div className="new-colour-group">
      <h2>Colour Group</h2>
      <div className="colour-swatches">
        {newColourGroup.map((colour, index) => {
          return (
            <div
              className="colour-swatch"
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
}
