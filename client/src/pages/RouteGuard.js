import React from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => {
  function hasJWT() {
    const authenticated = false;

    //check user has JWT token
    localStorage.getItem("accessToken")
      ? (authenticated = true)
      : (authenticated = false);

    return authenticated;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default RouteGuard;
