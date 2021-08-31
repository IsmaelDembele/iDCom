import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { myContext } from "../../Helper/context";

const Account = () => {
  const [user,setUser]=useState({});
  const { isLoggin, setIsLoggin } = useContext(myContext);

useEffect(() => {
  axios.get('http://localhost:5000/account')
  .then(res=>{
    if(isLoggin && res.data!== 'error'){
      const {userID, name, email} = res.data;
      setUser({userID,name,email});
    }
  })
  .catch(err=>{
    console.log('account error');
  })
}, [])


  return (
    <div className="account">
      <div className="account__text">
        <p className='account__id'>Account ID: {user.userID}</p>
        <p className='account__name'>Name: {user.name}</p>
        <p className='account__email'>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Account;
