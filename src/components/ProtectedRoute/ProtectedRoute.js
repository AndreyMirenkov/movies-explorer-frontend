import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {

    return (
      <Route>
        {loggedIn ? children : <Redirect to= "/" />}
      </Route>
    );
  };
  
  export default ProtectedRoute; 