import React, { useEffect, useState } from "react";
//import { InteractiveMap } from "../components/InteractiveMap.tsx";
import axios from "axios";
import { NavigationMode } from "../components/HomePageMap/NavigationMode.tsx";
import { ServiceRequestMode } from "../components/HomePageMap/ServiceRequestMode.tsx";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { ToggleModeButton } from "../components/HomePageMap/ToggleModeButton.tsx";
//import {DisplayPath} from "../components/DisplayPath.tsx";

const floors = ["LL2", "LL1", "F1", "F2", "F3"];
function HomePage() {
  const [mapIndex, setMapIndex] = useState(0);
  const [mode, setMode] = useState("Navigation");
  // load all the nodes on load of Homepage
  const [nodes, setNodes] = useState<{ [key: string]: MapNodeInterface }>();

  console.log(nodes, mapIndex);
  useEffect(() => {
    const all = async () => {
      try {
        const response = await axios.get(`/api/map/allTemp`);
        const aNodes: { [key: string]: MapNodeInterface } = response.data;
        setNodes(aNodes);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };
    all();
    setMapIndex(0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {mode === "Navigation" ? (
        <NavigationMode />
      ) : (
        <ServiceRequestMode
          nodes={Object.values(nodes!)}
          currentFloor={floors[mapIndex]}
          setHoveredNode={(a: string) => console.log(a)}
        />
      )}
      <div style={{ top: 20, right: 20, position: "absolute" }}>
        <ToggleModeButton currentMode={mode} setCurrentMode={setMode} />
      </div>
    </div>
  );
}

export default HomePage;
