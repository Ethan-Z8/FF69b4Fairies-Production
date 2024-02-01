import { SelectorTabs } from "./SelectorTabs.tsx";
import LL1Map from "../components/LL1Map.tsx";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import TransformContainer from "../components/TransformContainer.tsx";
import React from "react";
import PathFindingForm from "./PathFindingForm.tsx";

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
  const mapPath = LL1MapPath;

  return (
    <div className="home-frame">
      {selectedTab === 2 && <PathFindingForm />}
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
