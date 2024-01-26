import React from "react";
import { useNavigate } from "react-router-dom";

import "../style/GoToLogin.css";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/"); // Redirects to the login page
  };

  return (
    <>
      <div className="Login-Banner">
        <div className="Login-Button" onClick={handleButtonClick}>
          LOGOUT
        </div>
      </div>
    </>
  );
};

export default LogOutButton;
