import React from "react";
import { useNavigate } from "react-router-dom";

import "../style/GoToLogin.css";

const GoToLogin = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/loginPage"); // Redirects to the login page
  };

  return (
    <>
      <div className="Login-Banner">
        <div className="Login-Button" onClick={handleButtonClick}>
          LOGIN
        </div>
      </div>
    </>
  );
};

export default GoToLogin;
