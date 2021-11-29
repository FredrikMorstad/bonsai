import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/molecules/Navbar/Navbar";
import { AuthenticateContext } from "context/authProvider";
import { PrivateRoute, AuthorizationRoute } from "routes/index";
import { HomePage, LoginPage, ProfilePage, RegisterPage } from "components/pages/index";

export const App = () => {
  const { authenticated } = useContext(AuthenticateContext);
  console.log(`auth: ${authenticated}`);
  return (
    <Router>
      <Navbar />
      <Switch>
        <AuthorizationRoute path="/login" component={LoginPage} />
        <AuthorizationRoute path="/register" component={RegisterPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <p>login: {`${authenticated}`}</p>
    </Router>
  );
};
