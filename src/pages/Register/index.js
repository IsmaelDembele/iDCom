import React, { useState, useContext } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Link, useHistory } from "react-router-dom";
import { myContext } from "../../Helper/context";

import axios from "axios";

import Logo from "../../assets/logo.jpg";
import GoogleButton from "../../components/GoogleButton.js";
import { NAME_LENGTH, PASSWORD_LENGTH, PATH_ENDPOINTS, RESULT } from "../../Helper/constants";

const Register = () => {
  const [fullnameChecker, setFullNameChecker] = useState(false);
  const [emailChecker, setEmailChecker] = useState(false);
  const [pwdChecker, setPwdChecker] = useState(false);
  const [pwdConfChecker, setPwdConfChecker] = useState(false);

  const [fullName, setFullName] = useState("hi hi");
  const [email, setEmail] = useState("hi@hi.com");
  const [pwd, setPwd] = useState("12345678");
  const [pwdConf, setPwdConf] = useState("12345678");
  const { path } = useContext(myContext);

  const history = useHistory();

  const handleChangeFullName = e => {
    const value = e.target.value;
    const test = value.length < NAME_LENGTH && value !== "";
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
    const test = value.length >= PASSWORD_LENGTH || value === "";
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
    if (fullName.length < NAME_LENGTH) {
      test = false;
      setFullNameChecker(true);
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      test = false;
      setEmailChecker(true);
    }

    if (pwd.length < PASSWORD_LENGTH) {
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
      .post(`${path}/${PATH_ENDPOINTS.REGISTER}`, {
        fullname: fullName,
        email: email,
        password: pwd,
      })
      .then(response => {
        if (response.data === RESULT.ACCOUNT_CREATED) {
          alert("Account created");
          history.push(`/${PATH_ENDPOINTS.SIGN_IN}`);
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
