import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { myContext } from "../../Helper/context";
import { useHistory } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState({});
  const { isLoggin, setIsLoggin } = useContext(myContext);
  const history = useHistory();

  useEffect(() => {
    console.log('test');
    if (isLoggin) {
      axios
        .get("http://localhost:5000/account")
        .then(res => {
          if (res.data.myStatus === "OK") {
            const { userID, name, email } = res.data;
            setUser({ userID, name, email });
          }
        })
        .catch(err => {
          alert("something went wrong");
          history.push("/");
        });
    }
  }, [isLoggin,history]);

  const handleDelete = () => {
    axios.post("http://localhost:5000/delete").then(res => {
      if (res.data === "OK") {
        setIsLoggin(false);
        setUser({});
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
