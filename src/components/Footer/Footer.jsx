import React from "react";
import "../Header/Header.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "iiitp civilised";

  return (
    <footer>
      <p className="copyright">
        &copy; {currentYear} <span>{companyName}</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
