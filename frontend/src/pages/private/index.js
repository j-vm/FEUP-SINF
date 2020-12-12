import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "../../auth";
import { Setup } from "./Setup";
import { Processes } from "./Processes";
import { Steps } from "./Steps";
import { Process } from "./Process";
import { Logs } from "./Logs";
import { Log } from "./Log";
import { Sync } from "./Sync";
import { Info } from "./Info";
import { NavBar } from "../../components/NavBar";
import { Layout } from "../../components/Layout";
import { NoMatch } from "../NoMatch";

export default function PrivateRoutes() {
  const auth = useAuth();

  return auth.token === "" ? (
    <Redirect to="/login"></Redirect>
  ) : (
    <>
      <NavBar></NavBar>
      <Layout>
        <Switch>
          <Route exact path="/app/" component={Info} />
          <Route path="/app/setup" component={Setup} />
          <Route path="/app/processes" component={Processes} />
          {/* <Route path="/app/process/1" component={Process} /> */}
          {/* Aqui acho que é preciso fazer um switch para os processes */}
          <Route exact path="/app/steps" component={Steps}/> 
          <Route path="/app/logs" component={Logs} />
          <Route path="/app/log/1" component={Log} />
          <Route path="/app/sync" component={Sync} />
          <Route path="/app/info" component={Info} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </>
  );
}
