import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { NoMatch } from "./pages/NoMatch";
import { ProvideAuth } from "./auth";
import PrivateRoutes from "./pages/private";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <ProvideAuth>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={PrivateRoutes} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </ProvideAuth>
    );
  }
}

export default App;
