import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./not-found";
import Homepage from './homepage'

export default () =>
  <Switch>
    <Route exact path="/" component={Homepage} />

    <Route component={NotFound} />
  </Switch>
