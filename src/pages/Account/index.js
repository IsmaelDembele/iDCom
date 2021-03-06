import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { myContext } from "../../Helper/context";
import { useHistory } from "react-router-dom";
import { PATH_ENDPOINTS, RESULT } from "../../Helper/constants";

const Account = () => {
  const [user, setUser] = useState({});
  const { isLoggin, setIsLoggin, path } = useContext(myContext);
  const history = useHistory();

  useEffect(() => {
    if (isLoggin) {
      axios
        .get(`${path}/${PATH_ENDPOINTS.ACCOUNT}`)
        .then(res => {
          if (res.data.myStatus === RESULT.SUCCESS) {
            const { userID, name, email } = res.data;
            setUser({ userID, name, email });
          }
        })
        .catch(err => {
          alert("something went wrong");
          history.push("/");
        });
    }
  }, [isLoggin, history, path]);

  const handleDelete = () => {
    axios.post(`${path}/${PATH_ENDPOINTS.DELETE}`).then(res => {
      if (res.data === RESULT.SUCCESS) {
        setIsLoggin(false);
        history.push("/");
      }
    });
  };

  return (
    <div className="account">
      <div className="account__text">
        <p className="account__id">Account ID: {user.userID}</p>
        <p className="account__name">Name: {user.name}</p>
        <p className="account__email">Email: {user.email}</p>
        <p className="account__delete" onClick={() => handleDelete()}>
          Delete my account
        </p>
      </div>
    </div>
  );
};

export default Account;
