import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";

import SearchInput from "./SearchInput";
import Logo from "../../assets/logo.jpg";
import { myContext } from "../../Helper/context";
import { numeral_totalQuantity } from "../../Helper/function";

const Header = () => {
  const [cartItemNumber, setCartItemNumer] = useState(0);
  const { myCart } = useContext(myContext);

  useEffect(() => {
    const _itemNumber = numeral_totalQuantity(myCart);
    setCartItemNumer(_itemNumber);
  }, [myCart]);

  return (
    <header className="header">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <SearchInput />

        <div className="navbar__sign-in">
          <Link to="/sign">sing in</Link>
        </div>

        <div className="navbar__register">
          <Link to="/register">register</Link>
        </div>

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
