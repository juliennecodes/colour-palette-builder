import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ColourPalettes } from "./pages/read-colour-palettes/ColourPalettes";
import { ColourPalette } from "./pages/read-colour-palette/ColourPalette";
import { ColourGroups } from "./pages/read-colour-groups/ColourGroups";
import { AddNewColourGroup } from "./pages/create-new-colour-group/AddNewColourGroup";
import { CreateNewColourPalette } from "./pages/create-new-colour-palette/CreateNewColourPalette";
import { DeleteColourPalette } from "./pages/delete-colour-palette/DeleteColourPalette";
import { DeletecolourGroup } from "./pages/delete-colour-group/DeleteColourGroup";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/create-new-colour-palette"component={CreateNewColourPalette}/>
          <Route exact path="/" component={ColourPalettes} />
          <Route exact path="/colour-palettes/:id" component={ColourPalette} />
          <Route exact path="/delete-colour-palette" component={DeleteColourPalette} />
          <Route exact path="/colour-groups" component={ColourGroups} />
          <Route exact path="/delete-colour-group" component={DeletecolourGroup} />
          <Route
            exact
            path="/add-new-colour-group"
            component={AddNewColourGroup}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
