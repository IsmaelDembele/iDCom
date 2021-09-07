import React, { useState, useContext } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Link, useHistory } from "react-router-dom";
import { myContext } from "../../Helper/context";

import axios from "axios";

import Logo from "../../assets/logo.jpg";
import GoogleButton from "../../components/GoogleButton.js";

const passwordLength = 8;
// const passwordLength = 5;

const SignIn = () => {
  const [emailChecker, setEmailChecker] = useState(false);
  const [pwdChecker, setPwdChecker] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);
  const { path } = useContext(myContext);

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

  const handleClick = e => {
    e.preventDefault();
    errorMsg && setErrorMsg(false);

    let test = true;

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      test = false;
      setEmailChecker(true);
    }

    if (pwd.length < passwordLength) {
      test = false;
      setPwdChecker(true);
    }

    if (!test) {
      console.log(`error ${test}`);
      return;
    }
    // axios send with credentials;
    axios
      .post(`${path}/sign`, {
        email: email,
        password: pwd,
      })
      .then(response => {
        if (response.data === "OK" && response.status === 200) {
          console.log("connected successfully");
          setEmail("");
          setPwd("");
          history.push("/");
        } else {
          setErrorMsg(true);
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

  };

  return (
    <div className="sign-in">
      <Link to="/">
        <img src={Logo} alt="logo" className="sign-in__logo" />
      </Link>
      <div className="sign-in__container">
        <form action="#" method="post" className="sign-in__form">
          <p className="sign-in__text">Sign-in to iDCom</p>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            className="sign-in__email"
            type="email"
            onChange={e => handleChangeEmail(e)}
            value={email}
            error={emailChecker}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            className="sign-in__password"
            type="password"
            onChange={e => handleChangePwd(e)}
            value={pwd}
            error={pwdChecker}
          />
          <p className="sign-in__text-password">Forgot your password</p>
          {errorMsg && <p className="sign-in__error-msg">Invalid user/password</p>}
          <Button
            variant="contained"
            color="primary"
            className="btn-regular"
            onClick={e => handleClick(e)}
          >
            Sign in
          </Button>
        </form>
        <div className="sign-in__separator">
          <div className="sign-in__separator__text">or</div>
          <div className="sign-in__separator__line">
            <hr />
          </div>
        </div>

        <GoogleButton />

        <div className="sign-in__separator">
          <div className="sign-in__separator__line">
            <hr />
          </div>
        </div>

        <div className="sign-in__create-account">
          Don't have an account?&nbsp;
          <Link to="/register" style={{ color: "blue" }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
