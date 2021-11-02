import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { PASSWORD_LENGTH, PATH_ENDPOINTS, RESULT } from "../../Helper/constants";

const ChangePassword = props => {
  const { path, token } = props;
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdChecker, setPwdChecker] = useState(false);
  const [pwdConfirmChecker, setPwdConfirmChecker] = useState(false);
  // const [sending, setSending] = useState("");
  const history = useHistory();

  const handleChangePwd = e => {
    const value = e.target.value;
    const test = value.length >= PASSWORD_LENGTH || value === "";
    setPwdChecker(!test);
    setPwd(value);
  };
  const handleChangePwdConfirm = e => {
    const value = e.target.value;
    const test = pwd === value || value === "";
    setPwdConfirmChecker(!test);
    setPwdConfirm(value);
  };

  const handleClick = e => {
    e.preventDefault();
    let testError = false;

    if (pwdChecker || pwd.length === 0) {
      setPwdChecker(true);
      testError = true;
    }

    if (pwdConfirmChecker || pwdConfirm.length === 0) {
      setPwdConfirmChecker(true);
      testError = true;
    }

    if (testError) {
      return;
    }

    axios
      .post(`${path}/${PATH_ENDPOINTS.CHANGE_PASSWORD}`, { token, pwd })
      .then(response => {
        if (response.data === RESULT.SUCCESS) {
          alert("Password changed successfully!");
          history.push("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="reset_password__box">
      <h4 className="reset_password__title">Password Reset</h4>
      <form action="#" method="post" className="reset_password__form">
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          className="reset_password__email"
          type="Password"
          onChange={e => handleChangePwd(e)}
          value={pwd}
          error={pwdChecker}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          className="reset_password__email"
          type="Password"
          onChange={e => handleChangePwdConfirm(e)}
          value={pwdConfirm}
          error={pwdConfirmChecker}
        />
        <button type="submit" className="reset_password__btn" onClick={e => handleClick(e)}>
          Submit
        </button>
      </form>
      {/* {sending === "success" && (
        <p className="reset_password__confirmation">Check your email for the reset link</p>
      )}
      {sending === "failure" && (
        <p className="reset_password__confirmation">Something went wrong please try again later</p>
      )} */}
    </div>
  );
};

export default ChangePassword;
