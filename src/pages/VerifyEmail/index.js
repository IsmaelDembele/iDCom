import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../../Helper/context";
import axios from "axios";
import { PATH_ENDPOINTS, RESULT, TOKEN_STATUS } from "../../Helper/constants";
import { getCsrfToken } from "../../Helper/function";

const sendToken = async (path, token, setVerified) => {
  axios
    .post(`${path}/${PATH_ENDPOINTS.VERIFY_EMAIL}`, { token: token })
    .then(response => {
      if (response.data === RESULT.SUCCESS) {
        setVerified(TOKEN_STATUS.VERIFIED);
      }
      if (response.data === RESULT.EXPIRED_TOKEN) {
        setVerified(TOKEN_STATUS.EXPIRED);
      }
      if (response.data.includes("error")) {
        setVerified(TOKEN_STATUS.ERROR);
        console.log("something went wrong ", response.data);
      }
    })
    .catch(error => {
      setVerified(TOKEN_STATUS.ERROR);
      console.log("could not get the data from the server", error);
    });
};

const Index = () => {
  const [verified, setVerified] = useState(TOKEN_STATUS.LOADING);
  const { path } = useContext(myContext);
  const { id } = useParams(); //jtw token

  useEffect(() => {
    getCsrfToken(path)
      .then(response => {
        sendToken(path, id, setVerified);
      })
      .catch(error => {
        console.log("Could not send the token to the server:", error);
      });
  }, [id, path]);

  useEffect(() => {
    //this will make sure the crsfToken is refresh
    if (verified === TOKEN_STATUS.EXPIRED) {
      window.location.reload();
    }
  }, [verified]);

  return (
    <div className="verifyAccount">
      <div className="verifyAccount__box">
        {verified === TOKEN_STATUS.LOADING && <p className="verifyAccount__text">...</p>}
        {verified === TOKEN_STATUS.VERIFIED && (
          <p className="verifyAccount__text">
            Your email has been confirmed successfully!!!
            <br /> You can now sign-in to your account.
          </p>
        )}
        {verified === TOKEN_STATUS.EXPIRED && (
          <p className="verifyAccount__text">
            Your token has expired, please try to sign in to received a new token.
          </p>
        )}
        {verified === TOKEN_STATUS.ERROR && (
          <p className="verifyAccount__text">
            We could not verify your email at this time.
            <br /> Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
