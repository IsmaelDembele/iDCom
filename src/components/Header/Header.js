import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";

import SearchInput from "./SearchInput";
import Logo from "../../assets/logo.jpg";
import { myContext } from "../../Helper/context";
import { totalQuantity } from "../../Helper/function";
import axios from "axios";
import { PATH_ENDPOINTS, RESULT } from "../../Helper/constants";

const Header = () => {
  const [cartItemNumber, setCartItemNumer] = useState(0);
  const { myCart, isLoggin, setIsLoggin, path } = useContext(myContext);
  const history = useHistory();

  useEffect(() => {
    const _itemNumber = totalQuantity(myCart);
    setCartItemNumer(_itemNumber);
  }, [myCart]);

  useEffect(() => {
    //get the connection status from the server
    axios
      .get(`${path}/${PATH_ENDPOINTS.SIGN_IN}`)
      .then(res => {
        setIsLoggin(res.data === RESULT.SUCCESS);
      })
      .catch(err => {
        console.log(err);
        setIsLoggin(false);
      });
  }, [path, setIsLoggin]);

  const signOut = () => {
    axios
      .post(`${path}/${PATH_ENDPOINTS.SIGN_OUT}`)
      .then(res => {
        if (res.data === RESULT.SUCCESS && res.status === 200) {
          setIsLoggin(false);
          history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <header className="header">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <SearchInput />

        {!isLoggin && (
          <Link to={`/${PATH_ENDPOINTS.SIGN_IN}`}>
            <div className="navbar__sign-in">sign in</div>
          </Link>
        )}

        {!isLoggin && (
          <Link to={`/${PATH_ENDPOINTS.REGISTER}`}>
            <div className="navbar__register">register</div>
          </Link>
        )}
        {isLoggin && (
          <Link to={`/${PATH_ENDPOINTS.ACCOUNT}`}>
            <div className="navbar__my-account">My Account</div>
          </Link>
        )}

        {isLoggin && (
          <div className="navbar__sign-out" onClick={() => signOut()}>
            Sign out
          </div>
        )}

        <div className="cart">
          <Link to={`/${PATH_ENDPOINTS.SHOPPING}`}>
            <Badge badgeContent={cartItemNumber} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </Link>
        </div>
      </div>

      <div className="products">
        <Link to="/">
          <div className="products__item products__first">
            <HomeIcon fontSize="large" />
          </div>
        </Link>
        <Link to={`/${PATH_ENDPOINTS.PRODUCTS}/${PATH_ENDPOINTS.ELECTRONICS}`}>
          <div className="products__item">Electronics</div>
        </Link>
        <Link to={`/${PATH_ENDPOINTS.PRODUCTS}/${PATH_ENDPOINTS.HOMES}`}>
          <div className="products__item">Homes</div>
        </Link>
        <Link to={`/${PATH_ENDPOINTS.PRODUCTS}/${PATH_ENDPOINTS.BOOKS}`}>
          <div className="products__item">Books</div>
        </Link>
        <Link to={`/${PATH_ENDPOINTS.PRODUCTS}/${PATH_ENDPOINTS.FASHIONS}`}>
          <div className="products__item">Fashions</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
