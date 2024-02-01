import React, { useState, useEffect } from "react";
import { SelectorTabs } from "./SelectorTabs.tsx";
import LL1Map from "../components/LL1Map.tsx";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import TransformContainer from "../components/TransformContainer.tsx";
import PathFindingForm from "./PathFindingForm.tsx";
import { DisplayPath } from "./DisplayPath.tsx";
import axios from "axios";
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
  const [pathStart, setPathStart] = useState<string>("");
  const [pathEnd, setPathEnd] = useState<string>("");

  const handleFormSubmit = () => {
    // You can perform any additional logic here before updating the paths
    setPathStart(pathStart);
    setPathEnd(pathEnd);
  };

  const mapPath = LL1MapPath;
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

  return (
    <div className="home-frame">
      {selectedTab === 2 && (
        <PathFindingForm
          startNode={pathStart}
          setStartNode={setPathStart}
          endNode={pathEnd}
          setEndNode={setPathEnd}
          onFormSubmit={handleFormSubmit}
        />
      )}
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
          <DisplayPath mapPath={mapPath} start={pathStart} end={pathEnd} />
          <LL1Map mapPath={mapPath} />
        </TransformContainer>
      </div>
    </div>
  );
};
