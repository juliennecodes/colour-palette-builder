import { useEffect, useState } from "react";
import "./ColourGroups.css";

export function ColourGroups() {
  const [colourGroups, setColourGroups] = useState(null);

  useEffect(() => {
    fetch(`/colour_groups`)
      .then((res) => res.json())
      .then((serverResponse) => setColourGroups(serverResponse.colourGroups));
  }, []);

  const Colours = ()=>{
    return(
      <div className="colour-groups">
          {colourGroups.map((colourGroup, index) => {
            return (
              <div className="colour-group" key={index}>
                <p>{colourGroup.name}</p>
                <div className="colour-group-colour-swatches">
                  {colourGroup.colours.map((colour, index) => {
                    return (
                      <div
                        onClick={() =>
                          copyColourValueToClipboard(
                            colour.hue,
                            colour.saturation,
                            colour.lightness
                          )
                        }
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
    )
  }
  return (
    <div className="colour-groups-page">
      <h1>Colour Groups</h1>
      {colourGroups && <Colours />}
    </div>
  );
}

function copyColourValueToClipboard(hue, saturation, lightness) {
  const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  navigator.clipboard.writeText(hslValue);
}


