import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Maps/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectLanguagePage from "./pages/SelectLanguagePage";
import LanguagePage from "./pages/LanguagePage";

function App() {
  const [currentLanguage, setCurrentLanguage] = React.useState(null);

  return (
    <Router>
      <Switch>
        <Route component={LanguagePage} path="/language" />
        {/* <Route component={Map} path="/map" /> */}
        <Route
          render={(props) => (
            <Map {...props} currentLanguage={currentLanguage} />
          )}
          path="/map"
        />
        <Route
          render={(props) => (
            <SelectLanguagePage
              {...props}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          exact={true}
          path="/"
        />
      </Switch>
    </Router>
  );
}

export default App;
