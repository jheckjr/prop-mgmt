import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>;