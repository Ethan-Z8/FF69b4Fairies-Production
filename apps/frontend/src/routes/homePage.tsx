import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../style/homePage.css";
import LL1Map from "../assets/00_thelowerlevel1.png";
import HospitalLogo from "../assets/image-1.png";
import Star from "../assets/star-1.svg";

export const Desktop = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // WILL CHANGE TO LOGIN PAGE
  };

  return (
    <div className="desktop">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="LL1-Map" alt="Element" src={LL1Map} />
            <img className="Location-Star" alt="Star" src={Star} />
            <div className="Location-Text">You Are Here!</div>

            <div className="Top-Banner" />
            <img className="Hospital-Logo" alt="Image" src={HospitalLogo} />

            <div className="Bottom-Banner" />
            <div className="Hospital-Copyright">
              © Brigham and Women&#39;s hospital
            </div>

            <div className="Ground-Button">GROUND</div>
            <div className="LL1-Button">LL1</div>
            <div className="LL2-Button">LL2</div>
            <div className="F1-Button">F1</div>
            <div className="F2-Button">F2</div>
            <div className="F3-Button">F3</div>
            <div className="Login-Button" onClick={handleLoginClick}>
              LOGIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  useEffect(() => {
    document.title = "home page";
    console.log(`rendered component`);
  });

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop />
    </div>
  );
}

export { HomePage };
