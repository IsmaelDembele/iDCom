import React from "react";
import { GoSearch } from "react-icons/go";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useHistory } from "react-router-dom";

import Logo from "../assets/logo.jpg";

const Header = () => {
  const history = useHistory();

  const handleSubmitForm = () => {
    history.push("/search");
  };

  return (
    <header className="header">
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <form action="#" className="search">
          <input type="text" className="search__input" placeholder="Search items" />
          <button className="search__button" onClick={() => handleSubmitForm()}>
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
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </Link>
        </div>
      </div>
      <div className="products">
        <div className="products__item">
          {/* <span className="products__menu">
            <MenuIcon fontSize="large" />
          </span> */}
          <Link to="/">
            <HomeIcon fontSize="large" />
          </Link>
        </div>
        <div className="products__item">
          <Link to="electronics">Electronics</Link>
        </div>
        <div className="homes">
          <Link to="homes">Homes</Link>
        </div>
        <div className="products__item">
          <Link to="books">Books</Link>
        </div>
        <div className="products__item">
          <Link to="fashion">Fashion</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
