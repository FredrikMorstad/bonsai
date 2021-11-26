import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthenticateContext } from "context/authProvider";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated, isValidating } = useContext(AuthenticateContext);

  if (isValidating) {
    return <div> Redirecting </div>;
  }

  return (
    <Route
      {...rest}
      render={(routerProps) =>
        authenticated ? (
          <Component {...routerProps} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: routerProps.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
