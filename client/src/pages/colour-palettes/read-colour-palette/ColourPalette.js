import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/Loading";
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

  return (
    <div className="colour-palette-page">
      {colourPalette ? (
        <>
          <h1>{`${colourPalette.name} Palette Page`}</h1>
          <div className="colour-groups">
          {colourPalette.primary.map((colourGroup, index) => {
            return (
              <div className="colour-group" key={index}>
                {colourGroup.map((colour, index) => {
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
            );
          })}
          </div>

        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
