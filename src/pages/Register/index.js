import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const passwordLength = 8;

const Register = () => {
  const [fullnameChecker, setFullNameChecker] = useState(false);
  const [emailChecker, setEmailChecker] = useState(false);
  const [pwdChecker, setPwdChecker] = useState(false);
  const [pwdConfChecker, setPwdConfChecker] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConf, setPwdConf] = useState("");

  const handleChangeFullName = e => {
    const value = e.target.value;
    const test = value.length > 3;

    setFullNameChecker(test);
    setFullName(value);
  };
  const handleChangeEmail = e => {
    const value = e.target.value;
    const test = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
    setEmailChecker(test);
    setEmail(value);
  };
  const handleChangePwd = e => {
    const value = e.target.value;
    const test = value.length >= passwordLength;
    setPwdChecker(test);
    setPwd(value);
  };
  const handleChangePwdConf = e => {
    const value = e.target.value;
    const test = value === pwd;
    setPwdConfChecker(test);
    setPwdConf(value);
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
            error={fullName !== "" && !fullnameChecker}
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            className="register__email"
            type="email"
            onChange={e => handleChangeEmail(e)}
            value={email}
            error={email !== "" && !emailChecker}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            className="register__password"
            type="password"
            onChange={e => handleChangePwd(e)}
            value={pwd}
            error={pwd !== "" && !pwdChecker}
          />

          <TextField
            label="Confirm password"
            variant="outlined"
            size="small"
            className="register__password"
            type="password"
            onChange={e => handleChangePwdConf(e)}
            value={pwdConf}
            error={pwdConf !== "" && !pwdConfChecker}
          />
          <p className="register__text-password">Passwords must be at least 8 characters.</p>

          <Button variant="contained" color="primary" className="btn-regular">
            Create your account
          </Button>
        </form>
        <div className="register__separator">
          <div className="register__separator__text">or</div>
          <div className="register__separator__line">
            <hr />
          </div>
        </div>

        <div className="btn-google">
          <div className="btn-google__icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 48 48"
              className="abcRioButtonSvg"
            >
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
          </div>
          <p className="btn-google__text">Sign up with Google</p>
        </div>

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
