import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { PATH_ENDPOINTS } from "../../Helper/constants";

const RequestToken = props => {
  const { path } = props;
  const [sending, setSending] = useState("");
  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState(false);

  const handleChange = e => {
    const value = e.target.value;
    const test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
    setEmailChecker(!test);
    setEmail(value);
  };

  const handleClick = e => {
    e.preventDefault();

    if (emailChecker) {
      return;
    }

    axios
      .post(`${path}/${PATH_ENDPOINTS.REQUEST_TOKEN}`, { email })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          setSending("success");
        } else {
          setSending("failure");
        }
      })
      .catch(error => {
        console.log(error);
        setSending("failure");
      });
  };

  return (
    <div className="reset_password__box">
      <h4 className="reset_password__title">Password Reset</h4>
      <form action="#" method="post" className="reset_password__form">
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          className="reset_password__email"
          type="email"
          onChange={e => handleChange(e)}
          value={email}
          error={emailChecker}
        />
        <button type="submit" className="reset_password__btn" onClick={e => handleClick(e)}>
          Submit
        </button>
      </form>
      {sending === "success" && (
        <p className="reset_password__confirmation">Check your email for the reset link</p>
      )}
      {sending === "failure" && (
        <p className="reset_password__confirmation">Something went wrong please try again later</p>
      )}
    </div>
  );
};

export default RequestToken;
