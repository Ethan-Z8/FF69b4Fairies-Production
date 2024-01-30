// SelectorTabs.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/SelectorTabs.css";
import logo from "../assets/image-1.png";
import "../styling/GoToLogin.css";

function LoginButtonForSelectorTab({
  loginorlogout,
  onButtonClick,
}: {
  loginorlogout: string;
  onButtonClick: () => void;
}) {
  return (
    <div className="Login-Banner">
      <div className="Login-Button" onClick={onButtonClick}>
        {loginorlogout}
      </div>
    </div>
  );
}

export function SelectorTabs({ statusOfPage }: { statusOfPage: string }) {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const handleTabClick = (tabNumber: number) => {
    setSelectedTab(tabNumber);
  };

  const handleButtonClick = () => {
    if (statusOfPage === "LOGOUT") {
      // Redirect to homepage when clicking logout on Admin Page
      navigate("/");
    } else {
      // Redirect to login page when clicking login on Home Page
      navigate("/loginPage");
    }
  };

  const floorList = ["GRND", "LL1", "LL2", "F1", "F2", "F3"];

  return (
    <header className="selector-tabs-container">
      <div>
        <img className={"hospitalLogo"} src={logo} alt="Hospital Logo" />
      </div>
      {[0, 1, 2, 3, 4, 5].map((tabIndex) => (
        <div
          key={tabIndex}
          className={`selector-tab ${selectedTab === tabIndex ? "active" : ""}`}
          onClick={() => handleTabClick(tabIndex)}
        >
          {floorList[tabIndex]}
        </div>
      ))}
      <LoginButtonForSelectorTab
        loginorlogout={statusOfPage}
        onButtonClick={handleButtonClick}
      />
    </header>
  );
}
