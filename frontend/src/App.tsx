import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/molecules/Navbar/Navbar";
import { AuthenticateContext } from "context/authProvider";
import { PrivateRoute, AuthorizationRoute } from "routes/index";
import { HomePage, LoginPage, ProfilePage } from "components/pages/index";

export const App = () => {
  const { authenticated } = useContext(AuthenticateContext);
  console.log(`auth: ${authenticated}`);
  return (
    <Router>
      <Navbar />
      <Switch>
        <AuthorizationRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <p>login: {`${authenticated}`}</p>
    </Router>
  );
};
