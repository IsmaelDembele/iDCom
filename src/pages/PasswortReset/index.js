// import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
// import axios from "axios";
import { myContext } from "../../Helper/context";
import { PATH_ENDPOINTS } from "../../Helper/constants";
import { useParams } from "react-router-dom";
import RequestToken from "./RequestToken";
import ChangePassword from "./ChangePassword";

const PasswordReset = () => {
  const { path } = useContext(myContext);
  const { id } = useParams();

  return (
    <div className="reset_password">
      {id === PATH_ENDPOINTS.REQUEST_TOKEN ? (
        <RequestToken path={path} />
      ) : (
        <ChangePassword token={id} path={path} />
      )}
    </div>
  );
};

export default PasswordReset;
