import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/SelectorTabs.css";
import logo from "../assets/image-1.png";
import "../styling/GoToLogin.css";
import HamburgerMenu from "./HamburgerMenu"; // Ensure HamburgerMenu is used correctly

interface SelectorTabsProps {
  statusOfPage: string;
  onTabClick: (tabIndex: number) => void;
  navBarArray: Array<string>;
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
  navBarArray,
}: SelectorTabsProps) {
  const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();

  const handleTabClick = (tabNumber: number) => {
    setSelectedTab(tabNumber);
    onTabClick(tabNumber);
  };

  const handleButtonClick = () => {
    if (statusOfPage === "LOGOUT") {
      navigate("/");
    } else {
      navigate("/loginPage");
    }
  };

  return (
    <header className="selector-tabs-container">
      <div className={"logo-container"}>
        <img className={"hospitalLogo"} src={logo} alt="Hospital Logo" />
      </div>
      {[0, 1, 2, 3, 4, 5].map((tabIndex) => (
        <div
          key={tabIndex}
          className={`selector-tab ${selectedTab === tabIndex ? "active" : ""}`}
          style={{ flex: `1 0 ${100 / 8}%` }}
          onClick={() => {
            handleTabClick(tabIndex);
          }}
        >
          {navBarArray[tabIndex]}
        </div>
      ))}

      <HamburgerMenu
        menuItems={[
          { name: "GRND", index: 0 },
          { name: "LL1", index: 1 },
          { name: "LL2", index: 2 },
          { name: "F1", index: 3 },
          { name: "F2", index: 4 },
          { name: "F3", index: 5 },
        ]}
        onMenuItemClick={handleTabClick} // This ensures that clicking a menu item triggers the tab change
        selectedTabIndex={selectedTab} // Pass the currently selected tab index
      />

      <LoginButtonForSelectorTab
        loginorlogout={statusOfPage}
        onButtonClick={handleButtonClick}
      />
    </header>
  );
}
