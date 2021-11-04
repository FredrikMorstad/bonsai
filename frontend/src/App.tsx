import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/Home";
import Navbar from "./components/molecules/Navbar/Navbar";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};
