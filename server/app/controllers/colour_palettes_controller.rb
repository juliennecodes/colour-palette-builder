class ColourPalettesController < ApplicationController
    def index
        render json: {
            colourPalettes: [
              {
                name: "Summer",
                id: 1,
              },
              
              {
                name: "Pink Clouds",
                id: 2,
              },
            ],
          }
    end

    def show
        render json: {
          colourPalette: {
            name: "Summer",
            primary: [
              [
                {
                  hue: 0,
                  saturation: 100,
                  lightness: 78,
                },
                {
                  hue: 0,
                  saturation: 100,
                  lightness: 83,
                },
                {
                  hue: 0,
                  saturation: 100,
                  lightness: 90,
                },
                {
                  hue: 0,
                  saturation: 100,
                  lightness: 95,
                },
              ],
              [
                {
                  hue: 193,
                  saturation: 70,
                  lightness: 60,
                },
                {
                  hue: 193,
                  saturation: 70,
                  lightness: 73,
                },
                {
                  hue: 193,
                  saturation: 72,
                  lightness: 82,
                },
                {
                  hue: 193,
                  saturation: 70,
                  lightness: 91,
                },
              ],
              [
                {
                  hue: 54,
                  saturation: 100,
                  lightness: 55,
                },
                {
                  hue: 54,
                  saturation: 100,
                  lightness: 65,
                },
                {
                  hue: 54,
                  saturation: 100,
                  lightness: 77,
                },
                {
                  hue: 54,
                  saturation: 100,
                  lightness: 89,
                },
              ],
            ],
            secondary: [],
            greys: [],
            accent: [],
          }
        }
    end

    def create
        head :no_content
    end

    def destroy
      head :no_content
  end
end
