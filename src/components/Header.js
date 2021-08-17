import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useHistory } from "react-router-dom";

import Logo from "../assets/logo.jpg";

import { ItemNumberContect } from "../Helper/context";
import { numeral_totalQuantity } from "../Helper/fn_numeral";

const Header = () => {
  const [cartItemNumber, setCartItemNumer] = useState(0);
  const [searchItem, setSearchItem] = useState("");

  const { myCart } = useContext(ItemNumberContect);
  const history = useHistory();

  useEffect(() => {
    const _itemNumber = numeral_totalQuantity(myCart);
    setCartItemNumer(_itemNumber);
  }, [myCart]);

  const handleSubmitForm = () => {
    searchItem !== "" && history.push(`/products/${searchItem}`);
  };
  const handleChange = e => {
    const _item = e.target.value;
    console.log(_item);
    setSearchItem(_item);
  };

  return (
    <header className="header">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <form action="#" className="search">
          <input
            type="text"
            className="search__input"
            value={searchItem}
            placeholder="Search for products"
            onChange={e => handleChange(e)}
          />
          <button className="search__button" onClick={e => handleSubmitForm(e)}>
            <GoSearch />
          </button>
        </form>

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
        <div className="products__item">
          <Link to="/">
            <HomeIcon fontSize="large" />
          </Link>
        </div>
        <div className="products__item">
          <Link to="/products/electronics">Electronics</Link>
        </div>
        <div className="products__item">
          <Link to="/products/homes">Homes</Link>
        </div>
        <div className="products__item">
          <Link to="/products/books">Books</Link>
        </div>
        <div className="products__item">
          <Link to="/products/fashion">Fashion</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
