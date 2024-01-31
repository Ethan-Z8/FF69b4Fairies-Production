// SelectorTabs.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/SelectorTabs.css";
import logo from "../assets/image-1.png";
import "../styling/GoToLogin.css";

interface SelectorTabsProps {
  statusOfPage: string;
  onTabClick: (tabIndex: number) => void;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
  option6: string;
}

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

export function SelectorTabs({
  statusOfPage,
  onTabClick,
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
}: SelectorTabsProps) {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const handleTabClick = (tabNumber: number) => {
    setSelectedTab(tabNumber);
    onTabClick(tabNumber);
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

  const navMenuList = [option1, option2, option3, option4, option5, option6];

  return (
    <header className="selector-tabs-container">
      <div>
        <img className={"hospitalLogo"} src={logo} alt="Hospital Logo" />
      </div>
      {[0, 1, 2, 3, 4, 5].map((tabIndex) => (
        <div
          key={tabIndex}
          className={`selector-tab ${selectedTab === tabIndex ? "active" : ""}`}
          onClick={() => {
            handleTabClick(tabIndex);
          }}
        >
          {navMenuList[tabIndex]}
        </div>
      ))}
      <LoginButtonForSelectorTab
        loginorlogout={statusOfPage}
        onButtonClick={handleButtonClick}
      />
    </header>
  );
}
