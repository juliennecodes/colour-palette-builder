import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Homepage } from "./components/Homepage";
import { ColourPalettes } from "./pages/colour-palettes/ColourPalettes";
import { ColourPalette } from "./pages/colour-palette/ColourPalette";
import { AddNewColours } from "./pages/add-new-colours/AddNewColours";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/colour-palettes" component={ColourPalettes} />
          <Route exact path="/colour-palettes/:id" component={ColourPalette} />
          <Route exact path="/add-new-colours" component={AddNewColours} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
