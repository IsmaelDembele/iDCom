import React from "react";
import Logo from "../assets/logodark.jpg";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__logo">
        <img src={Logo} alt="logo" className="footer__img" />
      </div>
      <div className="footer__copyright">© 2021 by iDCom. All right reserved.</div>
    </section>
  );
};

export default Footer;
