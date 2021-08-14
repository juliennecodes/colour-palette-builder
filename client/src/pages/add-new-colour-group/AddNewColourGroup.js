import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddNewColourGroup.css";

export function AddNewColourGroup() {
  const [newColourGroup, setNewColourGroup] = useState([]);
  const [newColour, setNewColour] = useState({});
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

        <button>Add new colour</button>
      </form>

      <div className="new-colour-group">
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
