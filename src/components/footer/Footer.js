import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">
        <a href="/dashboard">
          Food Blog
        </a>{' | '}
        <a href="/aboutUs">
          About Us
        </a>{' | '}
        <a href="/aboutUs">
          Contact Us
        </a>
      </p>
    </div>
  );
};

export default Footer;
