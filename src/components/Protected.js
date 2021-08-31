import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { myContext } from "../Helper/context";

// import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggin} = useContext(myContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
