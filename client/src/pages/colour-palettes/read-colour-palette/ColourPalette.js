import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ColourPalette.css";

export function ColourPalette() {
  const [colourPalette, setColourPalette] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/colour_palettes/${id}`)
      .then((res) => res.json())
      .then((serverResponse) => {
        setColourPalette(serverResponse.colourPalette);
      });
  }, [id]);

  const ColourGroups = () => {
    return (
      <div className="colour-groups">
        {colourPalette.primary.map((colourGroup, index) => {
          return (
            <div className="colour-group-colour-swatches" key={index}>
              {colourGroup.map((colour, index) => {
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
          );
        })}
      </div>
    );
  };

  return (
    <div className="colour-palette-page">
      {colourPalette && <h1>{`${colourPalette.name} Palette Page`}</h1>}
      {colourPalette && <ColourGroups />}
    </div>
  );
}

function copyColourValueToClipboard(hue, saturation, lightness) {
  const hslValue = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  navigator.clipboard.writeText(hslValue);
}
