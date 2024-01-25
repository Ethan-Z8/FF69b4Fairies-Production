import React from "react";
import { useNavigate } from "react-router-dom";

import "../style/loginButton.css";

const LoginButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <>
      <div className="Login-Banner" />
      <div className="Login-Button" onClick={handleButtonClick}>
        LOGIN
      </div>
    </>
  );
};

export default LoginButton;
