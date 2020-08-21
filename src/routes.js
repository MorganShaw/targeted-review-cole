import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Auth from "./Components/Auth";
import Admin from './Components/Admin'

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dash" component={Dashboard} />
    <Route path='/admin' component={Admin} />
  </Switch>
);

  
  //Parentheses mean this is an implied return (JSX).


//Remember. This is just rendering this component individually. Not getting any info from these components. Not passing props. That would be the role of redux (or just good ol' state and props).