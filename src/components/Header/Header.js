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

const Header = () => {
  const [cartItemNumber, setCartItemNumer] = useState(0);
  const { myCart, isLoggin, setIsLoggin, path } = useContext(myContext);
  const history = useHistory();

  useEffect(() => {
    const _itemNumber = totalQuantity(myCart);
    setCartItemNumer(_itemNumber);
  }, [myCart]);

  useEffect(() => {
    console.log('test');
    axios
      .get(`${path}/sign`)
      .then(res => {
        setIsLoggin(res.data === true);
      })
      .catch(err => {
        console.log(err);
        setIsLoggin(false);
      });
    }, [path, setIsLoggin]);

  const signOut = () => {
    axios
      .post(`${path}/sign-out`)
      .then(res => {
        if (res.data === "OK" && res.status === 200) {
          setIsLoggin(false);
          history.push("/");
          console.log("user logged out");
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
          <Link to="/sign">
            <div className="navbar__sign-in">sign in</div>
          </Link>
        )}

        {!isLoggin && (
          <Link to="/register">
            <div className="navbar__register">register</div>
          </Link>
        )}
        {isLoggin && (
          <Link to="/account">
            <div className="navbar__my-account">My Account</div>
          </Link>
        )}

        {isLoggin && (
          <div className="navbar__sign-out" onClick={() => signOut()}>
            Sign out
          </div>
        )}

        <div className="cart">
          <Link to="/shopping">
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
        <Link to="/products/electronics">
          <div className="products__item">Electronics</div>
        </Link>
        <Link to="/products/homes">
          <div className="products__item">Homes</div>
        </Link>
        <Link to="/products/books">
          <div className="products__item">Books</div>
        </Link>
        <Link to="/products/fashion">
          <div className="products__item">Fashion</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
