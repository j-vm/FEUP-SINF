import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "../../auth";
import { Setup } from "./Setup";
import { Processes } from "./Processes";
import { Steps } from "./Steps";
import { Logs } from "./Logs";
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
          <Route exact path="/app/processes" component={Processes} />
          <Route path="/app/processes/:id/steps" component={Steps} />
          <Route path="/app/logs" component={Logs} />
          <Route path="/app/sync" component={Sync} />
          <Route path="/app/info" component={Info} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </>
  );
}
