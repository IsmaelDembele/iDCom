import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Logo from "../../assets/logo.jpg";
import { Alert } from "../../Helper/function";
import GoogleButton from "../../components/GoogleButton.js";

// const passwordLength = 8;
const passwordLength = 5;
const nameLenght = 4;

const Register = () => {
  const [fullnameChecker, setFullNameChecker] = useState(false);
  const [emailChecker, setEmailChecker] = useState(false);
  const [pwdChecker, setPwdChecker] = useState(false);
  const [pwdConfChecker, setPwdConfChecker] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");

  const history = useHistory();

  const handleChangeFullName = e => {
    const value = e.target.value;
    const test = value.length < nameLenght && value !== "";
    setFullName(value);
    setFullNameChecker(test);
  };
  const handleChangeEmail = e => {
    const value = e.target.value;
    const test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || value === "";
    setEmailChecker(!test);
    setEmail(value);
  };
  const handleChangePwd = e => {
    const value = e.target.value;
    const test = value.length >= passwordLength || value === "";
    setPwdChecker(!test);
    setPwd(value);
  };
  const handleChangePwdConf = e => {
    const value = e.target.value;
    const test = value === pwd || value === "";
    setPwdConfChecker(!test);
    setPwdConf(value);
  };

  const handleCreateAccount = e => {
    e.preventDefault();
    let test = true;
    if (fullName.length < nameLenght) {
      test = false;
      setFullNameChecker(true);
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      test = false;
      setEmailChecker(true);
    }

    if (pwd.length < passwordLength) {
      test = false;
      setPwdChecker(true);
    }

    if (pwd !== pwdConf) {
      setPwdConfChecker(true);
      test = false;
    }

    if (!test) {
      console.log(`error ${test}`);
      return;
    }
    //axios are with crendential defined in App.js
    axios
      .post("http://localhost:5000/register", {
        fullname: fullName,
        email: email,
        password: pwd,
      })
      .then(response => {
        console.log(response.data);

        if (response.data === "account created") {
          //show confirmation message
          setSnackbarState(true);
        }
      })
      .catch(error => {
        console.log(`error while fetching data ${error}`);
      });

    setFullName("");
    setEmail("");
    setPwd("");
    setPwdConf("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState(false);
    // redirect to landing page
    history.push("/");
  };

  return (
    <div className="register">
      <Link to="/">
        <img src={Logo} alt="logo" className="register__logo" />
      </Link>

      <div className="register__container">
        <form action="#" className="register__form">
          <p className="register__text">Create an Account</p>
          <TextField
            label="Full name"
            variant="outlined"
            size="small"
            className="register__name"
            type="text"
            onChange={e => handleChangeFullName(e)}
            value={fullName}
            error={fullnameChecker}
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            className="register__email"
            type="email"
            onChange={e => handleChangeEmail(e)}
            value={email}
            error={emailChecker}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            className="register__password"
            type="password"
            onChange={e => handleChangePwd(e)}
            value={pwd}
            error={pwdChecker}
          />

          <TextField
            label="Confirm password"
            variant="outlined"
            size="small"
            className="register__password"
            type="password"
            onChange={e => handleChangePwdConf(e)}
            value={pwdConf}
            error={pwdConfChecker}
          />
          <p className="register__text-password">Passwords must be at least 8 characters.</p>

          <Snackbar open={snackbarState} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Account created successfully!!
            </Alert>
          </Snackbar>

          <Button
            variant="contained"
            color="primary"
            className="btn-regular"
            onClick={e => handleCreateAccount(e)}
          >
            Create your account
          </Button>
        </form>
        <div className="register__separator">
          <div className="register__separator__text">or</div>
          <div className="register__separator__line">
            <hr />
          </div>
        </div>

        <GoogleButton />

        <div className="register__separator">
          <div className="register__separator__line">
            <hr />
          </div>
        </div>

        <div className="register__create-account">
          By creating an account, you agree to iDCom's Conditions of Use and Privacy Notice.
        </div>
      </div>
    </div>
  );
};

export default Register;
