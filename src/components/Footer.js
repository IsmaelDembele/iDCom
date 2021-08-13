import React from "react";
import Logo from "../assets/logodark.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__logo">
        <Link to="/">
          <img src={Logo} alt="logo" className="footer__img" />
        </Link>
      </div>
      <div className="footer__copyright">© 2021 by iDCom. All right reserved.</div>
    </section>
  );
};

export default Footer;
