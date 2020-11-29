import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Setup } from "./pages/Setup";
import { Processes } from "./pages/Processes";
import { Process } from "./pages/Process";
import { EditProcess } from "./pages/EditProcess";
import { Logs } from "./pages/Logs";
import { Log } from "./pages/Log";
import { Sync } from "./pages/Sync";
import { Info } from "./pages/Info";
import { Layout } from "./components/Layout";
import { NavBar } from "./components/NavBar"
import { NoMatch } from "./pages/NoMatch";

class App extends Component {
  render(){
    return (  
      <React.Fragment >
        <NavBar></NavBar>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/setup" component={Setup} />
              <Route path="/processes" component={Processes} />
              <Route path="/process/1" component={Process} />
              <Route path="/process/1/edit" component={EditProcess} />
              <Route path="/logs" component={Logs} />
              <Route path="/log/1" component={Log} />
              <Route path="/sync" component={Sync} />
              <Route path="/info" component={Info} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
