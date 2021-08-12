import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ColourPalettes } from "./pages/colour-palettes/ColourPalettes";
import { ColourPalette } from "./pages/colour-palette/ColourPalette";
import { ColourGroups } from "./pages/colour-groups/ColourGroups";
import { AddNewColours } from "./pages/add-new-colours/AddNewColours";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={ColourPalettes} />
          <Route exact path="/colour-palettes/:id" component={ColourPalette} />
          <Route exact path="/colour-groups" component={ColourGroups} />
          <Route exact path="/add-new-colours" component={AddNewColours} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
