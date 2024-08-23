import React, { useState } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import Button from "../CommonUI/Button";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedin(false);
    navigate("/");
  };

  return (
    <div className="header">
      <p className="header-heading link">Recipe App</p>
      <nav role="navigation"> 
        <span className="spaces">|</span>
        <Link className="heading-home" to="/dashboard">
         Home
        </Link> 
        <span className="space">|</span>
        <Link className="heading-aboutus" to="/aboutUs">
         About Us
        </Link> 
      </nav>
      <Button className="btn btn-logout" onClickCapture={logout}>
        {" "}
        Logout{" "}
      </Button>
    </div>
  );
};

export default Header;
