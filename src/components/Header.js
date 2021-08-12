import React from "react";
import { GoSearch } from "react-icons/go";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";

const Header = () => {
  return (
    <header className="header">
      <div className="navbar">
        <div className="logo"></div>

        <form action="#" className="search">
          <input type="text" className="search__input" placeholder="Search items" />
          <button className="search__button">
            <GoSearch />
          </button>
        </form>

        <div className="signIn">
          sing-in & <br /> registration
        </div>
        <div className="cart">
          <Badge badgeContent={4} color="primary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </div>
      </div>
      <div className="products">
        <div className="products__item">
          <span className="products__menu">
            <MenuIcon fontSize="large" />
          </span>
          All
        </div>
        <div className="products__item">Electronics </div>
        <div className="products__item">Homes</div>
        <div className="products__item">Books</div>
        <div className="products__item">Fashion</div>
      </div>
    </header>
  );
};

export default Header;
