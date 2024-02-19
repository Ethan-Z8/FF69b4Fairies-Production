import { useEffect, useState } from "react";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import axios from "axios";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { ServiceRequestNode } from "./ServiceRequestNode.tsx";
import TransformContainer from "./TransformContainer.tsx";

import LL2 from "../../assets/hospitalmaps/00_thelowerlevel2-min.png";
import LL1 from "../../assets/hospitalmaps/00_thelowerlevel1-min.png";
import F1 from "../../assets/hospitalmaps/01_thefirstfloor-min.png";
import F2 from "../../assets/hospitalmaps/02_thesecondfloor-min.png";
import F3 from "../../assets/hospitalmaps/03_thethirdfloor-min.png";

const maps = { L2: LL2, L1: LL1, "1": F1, "2": F2, "3": F3 };
const mapPathNames = Object.keys(maps) as Array<keyof typeof maps>;

export interface ServiceRequestModeProps {
  nodes: MapNodeInterface[];
  currentFloor: string;
  setHoveredNode: (node: string) => void;
}

export function ServiceRequestMode({
  nodes,
  currentFloor,
  setHoveredNode,
}: ServiceRequestModeProps) {
  console.log("sr nodes", nodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedNode, setSelectedNode] = useState("");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestType[]>(
    [],
  );
  const [imageSizes, setImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({
    L1: { width: 0, height: 0 },
    L2: { width: 0, height: 0 },
    "1": { width: 0, height: 0 },
    "2": { width: 0, height: 0 },
    "3": { width: 0, height: 0 },
  });

  useEffect(() => {
    axios
      .get("/api/serviceRequest")
      .then((res) => setServiceRequests(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const preloadImages = (paths: string[], callback: () => void) => {
      let loadedCount = 0;

      paths.forEach((path) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === paths.length) {
            callback(); // Invoke the callback once all images are loaded
          }
        };
      });
    };

    preloadImages(Object.values(maps), () => {
      // All images are preloaded
      const sizes: { [key: string]: { width: number; height: number } } = {};
      mapPathNames.forEach((name) => {
        const img = new Image();
        img.src = maps[name];
        sizes[name] = { width: img.width, height: img.height };
      });
      setImageSizes(sizes);
    });
  }, []);

  const reqsPerLocation = serviceRequests.reduce(
    (acc, req) => {
      acc[req.location] = ++acc[req.location] || 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const serviceRequestNodes = nodes
    .filter((node) => node.floor === currentFloor)
    .map((node) => (
      <ServiceRequestNode
        nodeInfo={node}
        numRequests={reqsPerLocation[node.nodeID] || 0}
        setSelectedNode={setSelectedNode}
        key={node.nodeID}
        setHoveredNode={setHoveredNode}
      />
    ));

  /*function getMapImage(currentFloor: string) {
  return <img src={maps[currentFloor as keyof typeof maps]}/>;
}*/

  return (
    <div>
      <TransformContainer>
        <div
          className="map-container"
          style={
            imageSizes[mapPathNames[0]]
              ? {
                  width: imageSizes[mapPathNames[0]].width,
                  height: imageSizes[mapPathNames[0]].height,
                }
              : {}
          }
        >
          {mapPathNames.map((name, index) => (
            <img
              key={index}
              src={maps[name]}
              alt={`map-${index}`}
              style={{
                width: "100%",
                height: "100%",
                display: index === 4 ? "block" : "none",
              }}
            />
          ))}
          {serviceRequestNodes}
        </div>
      </TransformContainer>
    </div>
  );
}
