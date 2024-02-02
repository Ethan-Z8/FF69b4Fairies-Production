import React, { useState, useEffect } from "react";
import { SelectorTabs } from "./SelectorTabs.tsx";
import Map from "../components/Map.tsx";
import LL1MapPath from "../assets/hospitalmaps/00_thelowerlevel1.png";
import TransformContainer from "../components/TransformContainer.tsx";
import PathFindingForm from "./PathFindingForm.tsx";
import { DisplayPath } from "./DisplayPath.tsx";
import axios from "axios";
interface menuProps {
  navBarArray: Array<string>;
  pageStatus: string;
  selectedTab: number;
  whatServiceOptions: React.ReactNode;
  onTabClick: (tabIndex: number) => void;
}

export const Desktop = ({
  whatServiceOptions,
  selectedTab,
  onTabClick,
  navBarArray,
  pageStatus,
}: menuProps) => {
  const [pathStart, setPathStart] = useState<string>("");
  const [pathEnd, setPathEnd] = useState<string>("");

  const handleFormSubmit = () => {
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
          navBarArray={navBarArray}
          statusOfPage={pageStatus}
          onTabClick={onTabClick}
        />
      </div>
      <div className="mapPage">
        <TransformContainer>
          <DisplayPath mapPath={mapPath} start={pathStart} end={pathEnd} />
          <Map mapPath={mapPath} />
        </TransformContainer>
      </div>
    </div>
  );
};
