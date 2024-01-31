import { SelectorTabs } from "./SelectorTabs.tsx";
import LL1Map from "../components/LL1Map.tsx";
import groundMapPath from "../assets/hospitalmaps/00_thegroundfloor.png";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import LL2MapPath from "../assets/hospitalmaps/00_thelowerlevel2.png";
import F1MapPath from "../assets/hospitalmaps/01_thefirstfloor.png";
import F2MapPath from "../assets/hospitalmaps/02_thesecondfloor.png";
import F3MapPath from "../assets/hospitalmaps/03_thethirdfloor.png";
import TransformContainer from "../components/TransformContainer.tsx";
import React from "react";

interface menuProps {
  menuProp1: string;
  menuProp2: string;
  menuProp3: string;
  menuProp4: string;
  menuProp5: string;
  menuProp6: string;
  pageStatus: string;
  selectedTab: number;
  whatServiceOptions: React.ReactNode;
  onTabClick: (tabIndex: number) => void;
}

export const Desktop = ({
  whatServiceOptions,
  selectedTab,
  onTabClick,
  menuProp1,
  menuProp2,
  menuProp3,
  menuProp4,
  menuProp5,
  menuProp6,
  pageStatus,
}: menuProps) => {
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
      {selectedTab === 4 && whatServiceOptions}
      <div className="Top-Bar">
        <SelectorTabs
          option1={menuProp1}
          option2={menuProp2}
          option3={menuProp3}
          option4={menuProp4}
          option5={menuProp5}
          option6={menuProp6}
          statusOfPage={pageStatus}
          onTabClick={onTabClick}
        />
      </div>
      <div className="mapPage">
        <TransformContainer>
          <LL1Map mapPath={mapPath} />
        </TransformContainer>
      </div>
    </div>
  );
};
