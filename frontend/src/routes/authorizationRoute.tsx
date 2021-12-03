import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthenticateContext } from 'context/authProvider';
import { IRouteProps } from './privateRoute';

const AuthorizationRoute: React.FC<IRouteProps> = ({
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
        !authenticated ? (
          <Component {...routerProps} />
        ) : (
          <Redirect
            to={{ pathname: '/', state: { from: routerProps.location } }}
          />
        )
      }
    />
  );
};

export default AuthorizationRoute;
