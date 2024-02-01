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
import TransformContainer from "../components/TransformContainer.tsx";

import { DisplayPath } from "../components/DisplayPath.tsx";
import axios from "axios";
//import {DisplayMapNodes} from "../components/DisplayMapNodes.tsx";

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

  const pathStart = "CLABS002L1";
  const pathEnd = "CHALL008L1";

  return (
    <div className="home-frame">
      <div className="Top-Bar">
        <SelectorTabs statusOfPage={"LOGIN"} onTabClick={onTabClick} />
      </div>
      <div className="mapPage">
        <TransformContainer>
          <DisplayPath mapPath={mapPath} start={pathStart} end={pathEnd} />
          <LL1Map mapPath={mapPath} />
        </TransformContainer>
      </div>
    </div>
  );
};

function HomePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  async function getMapNodes() {
    try {
      const allNodes = await axios.get("/api/map");
      const nodesData: Node[] = Object.values(allNodes.data);
      console.log(nodesData);
    } catch (error) {
      console.error("Error fetching map nodes:", error);
    }
  }
  useEffect(() => {
    document.title = "home page";
    getMapNodes();
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

export default HomePage;
