import React, { useEffect, useState } from "react";
//import { InteractiveMap } from "../components/InteractiveMap.tsx";
import axios from "axios";
import { InteractiveMap } from "../components/HomePageMap/InteractiveMap.tsx";
//import {DisplayPath} from "../components/DisplayPath.tsx";

interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  neighbors: string[];
}
function HomePage() {
  const [serviceMode, setServiceMode] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);
  // load all the nodes on load of Homepage
  const [nodes, setNodes] = useState<{ [key: string]: Node }>();

  console.log(nodes, mapIndex);
  useEffect(() => {
    const all = async () => {
      try {
        const response = await axios.get(`/api/map/allTemp`);
        const aNodes: { [key: string]: Node } = response.data;
        setNodes(aNodes);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };
    all();
    setMapIndex(0);
    setServiceMode(false);
  }, []);

  if (serviceMode) return <div></div>;
  else
    return (
      <div>
        <InteractiveMap />
      </div>
    );
}

export default HomePage;
