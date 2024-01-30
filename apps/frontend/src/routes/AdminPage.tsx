import React, { useEffect, useState } from "react";
import "../styling/homePage.css";
import { SelectorTabs } from "../components/SelectorTabs.tsx";
import LL1Map from "../components/LL1Map.tsx";
import groundMapPath from "../assets/hospitalmaps/00_thegroundfloor.png";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import LL2MapPath from "../assets/hospitalmaps/00_thelowerlevel2.png";
import F1MapPath from "../assets/hospitalmaps/01_thefirstfloor.png";
import F2MapPath from "../assets/hospitalmaps/02_thesecondfloor.png";
import F3MapPath from "../assets/hospitalmaps/03_thethirdfloor.png";

export const Desktop = ({
  selectedTab,
  onTabClick,
}: {
  selectedTab: number;
  onTabClick: (tabIndex: number) => void;
}) => {
  let mapPath = LL1MapPath; //Ground map

  if (selectedTab === 0) {
    // Ground map
    mapPath = groundMapPath;
  }
  if (selectedTab === 2) {
    // LL2 map
    mapPath = LL2MapPath;
  }
  if (selectedTab === 3) {
    // F1 map
    mapPath = F1MapPath;
  }
  if (selectedTab === 4) {
    // F2 map
    mapPath = F2MapPath;
  }
  if (selectedTab === 5) {
    // F3 map
    mapPath = F3MapPath;
  }

  return (
    <div className="home-frame">
      <div className="Top-Bar">
        <SelectorTabs statusOfPage={"LOGOUT"} onTabClick={onTabClick} />
      </div>
      <LL1Map mapPath={mapPath} />
    </div>
  );
};

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    document.title = "admin page";
    console.log(`rendered component`);
  }, []);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop selectedTab={selectedTab} onTabClick={handleTabClick} />
    </div>
  );
}

export default AdminPage;
