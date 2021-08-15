import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/Navigation";

import { CreateNewColourPalette } from "./pages/colour-palettes/create-new-colour-palette/CreateNewColourPalette";
import { ColourPalettes } from "./pages/colour-palettes/read-colour-palettes/ColourPalettes";
import { ColourPalette } from "./pages/colour-palettes/read-colour-palette/ColourPalette";
import { DeleteColourPalette } from "./pages/colour-palettes/delete-colour-palette/DeleteColourPalette";

import { CreateNewColourGroup } from "./pages/colour-groups/create-new-colour-group/CreateNewColourGroup";
import { ColourGroups } from "./pages/colour-groups/read-colour-groups/ColourGroups";
import { DeletecolourGroup } from "./pages/colour-groups/delete-colour-group/DeleteColourGroup";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
        </header>

        <main className="content">
          <Switch>
            <Route exact path="/create-new-colour-palette"component={CreateNewColourPalette}/>
            <Route exact path="/" component={ColourPalettes} />
            <Route exact path="/colour-palettes/:id" component={ColourPalette} />
            <Route exact path="/delete-colour-palette" component={DeleteColourPalette} />

            <Route exact path="/create-new-colour-group" component={CreateNewColourGroup}/>
            <Route exact path="/colour-groups" component={ColourGroups} />
            <Route exact path="/delete-colour-group" component={DeletecolourGroup} />

          </Switch>
        </main>
        
      </Router>
        <footer>Copyright &copy; 2021 Julienne San Luis</footer>
    </div>
  );
}

export default App;
