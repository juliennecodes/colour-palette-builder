import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AddSVG } from "../../../components/AddSVG";
import { RemoveSVG } from "../../../components/RemoveSVG";
import "./CreateNewColourPalette.css";

export function CreateNewColourPalette() {
  const [newColourPalette, setNewColourPalette] = useState({colourGroups: [],});
  const [colourGroups, setColourGroups] = useState(null);
  let history = useHistory();

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
  
  return (
    <form
      className="new-colour-palette-page"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(newColourPalette);
      }}
    >
        <h1 className="new-colour-palette-page-heading">New Colour Palette Form</h1>
        <NameInputField newColourPalette={newColourPalette} setNewColourPalette={setNewColourPalette}/>
        <SelectedColourGroups newColourPalette={newColourPalette} />
        {colourGroups && <ColourGroupChoices colourGroups={colourGroups} newColourPalette={newColourPalette} setNewColourPalette={setNewColourPalette}/>}
        <button className="submit-form-button">Create new colour palette</button>
    </form>
  );
}

function NameInputField({newColourPalette, setNewColourPalette}){
  return(
    <div className="new-colour-form-name-input-div">
    <label
      className="new-colour-form-name-input-label"
      htmlFor="input-field"
    >
      Name:
    </label>
    <input
      onChange={(e) =>
        setNewColourPalette({ ...newColourPalette, name: e.target.value })
      }
      className="new-colour-form-name-input"
      name="input-field"
      placeholder="Name..."
    ></input>
    <span className="new-colour-form-name-input-span"></span>
  </div>
  )
}

function SelectedColourGroups({newColourPalette}){
  return(
    <div className="selected-colour-groups">
    <h2 className="selected-colour-groups-heading">
      Selected Colour Groups:
    </h2>
    {newColourPalette.colourGroups.map((colourGroup, index) => {
      return (
        <div className="colour-group" key={index}>
          <div className="colour-group-colour-swatches">
            {colourGroup.colours.map((colour, index) => {
              return (
                <div
                  className="colour-group-colour-swatch"
                  key={index}
                  style={{backgroundColor: `hsl(${colour.hue}, ${colour.saturation}%, ${colour.lightness}%)`,}}
                ></div>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
  );
}

function ColourGroupChoices ({colourGroups, newColourPalette, setNewColourPalette}) {
  return(
    <div className="colour-group-choices">
    <h2 className="colour-group-choices-heading">Colour Group Choices:</h2>
    <div className="colour-groups">
      {colourGroups.map((colourGroup, index) => {
        return (
          <ColourGroupChoice
            key={index}
            colourGroup={colourGroup}
            newColourPalette={newColourPalette}
            setNewColourPalette={setNewColourPalette}
          />
        );
      })}
    </div>
  </div>
  )
}

function ColourGroupChoice({colourGroup, newColourPalette, setNewColourPalette}) {
  const [selected, setSelected] = useState(false);

  const addToColourPalette = (colourGroup) => {
    const updatedColourGroups = [...newColourPalette.colourGroups];
    updatedColourGroups.push(colourGroup);
    setNewColourPalette({...newColourPalette, colourGroups: updatedColourGroups});
  };

  const removeFromColourPalette = (colourGroup) => {
    const updatedColourGroups = [...newColourPalette.colourGroups].filter((cg) => cg.name !== colourGroup.name);
    setNewColourPalette({ ...newColourPalette, colourGroups: updatedColourGroups });
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
        <AddSVG />
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
        <RemoveSVG />
      </button>
    );
  };

  return (
    <div className="colour-group">
      <div
        className="deselect-overlay"
        style={ selected ? { backgroundColor: "hsla(208, 90%, 73%, .5)" } : { backgroundColor: "hsla(0, 0%, 0%, 0)" }}
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
