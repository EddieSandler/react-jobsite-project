import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

function PrivateRoute({ element: Component, ...rest }) {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  console.debug("PrivateRoute", "currentUser=", currentUser);

  if (!currentUser) {
    // Redirect to the login page and remember the last location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Component is passed as a prop and spread here as Component (capital C is important, it's a JSX element now)
  return <Component {...rest} />;
}

export default PrivateRoute;
