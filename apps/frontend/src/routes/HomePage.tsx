import React, { useState } from "react";
import "../styling/homePage.css";
import { SelectorTabs } from "../components/SelectorTabs"; // Adjust the import path as needed
import HamburgerMenu from "../components/HamburgerMenu";
import LL1Map from "../components/Map"; // Adjust the import path as needed
import groundMapPath from "../assets/hospitalmaps/00_thegroundfloor.png";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import LL2MapPath from "../assets/hospitalmaps/00_thelowerlevel2.png";
import F1MapPath from "../assets/hospitalmaps/01_thefirstfloor.png";
import F2MapPath from "../assets/hospitalmaps/02_thesecondfloor.png";
import F3MapPath from "../assets/hospitalmaps/03_thethirdfloor.png";
import TransformContainer from "../components/TransformContainer"; // Adjust the import path as needed

export const Desktop = ({
  selectedTab,
  onTabClick,
}: {
  selectedTab: number;
  onTabClick: (tabIndex: number) => void;
}) => {
  let mapPath = LL1MapPath; // Default map

  switch (selectedTab) {
    case 0:
      mapPath = groundMapPath;
      break;
    case 1:
      mapPath = LL1MapPath;
      break;
    case 2:
      mapPath = LL2MapPath;
      break;
    case 3:
      mapPath = F1MapPath;
      break;
    case 4:
      mapPath = F2MapPath;
      break;
    case 5:
      mapPath = F3MapPath;
      break;
    default:
      break;
  }

  return (
    <div className="home-frame">
      <div className="Top-Bar">
        <SelectorTabs statusOfPage={"LOGIN"} onTabClick={onTabClick} />
      </div>
      <div className="mapPage">
        <TransformContainer>
          <LL1Map mapPath={mapPath} />
        </TransformContainer>
      </div>
    </div>
  );
};

function HomePage() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop selectedTab={selectedTab} onTabClick={handleTabClick} />
      <HamburgerMenu
        menuItems={[
          { name: "GRND", index: 0 },
          { name: "LL1", index: 1 },
          { name: "LL2", index: 2 },
          { name: "F1", index: 3 },
          { name: "F2", index: 4 },
          { name: "F3", index: 5 },
        ]}
        onMenuItemClick={handleTabClick}
        selectedTabIndex={selectedTab} // Now correctly passes the selected tab index
      />
    </div>
  );
}

export default HomePage;
