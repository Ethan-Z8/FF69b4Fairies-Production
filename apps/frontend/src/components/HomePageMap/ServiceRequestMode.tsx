import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../../styling/DisplayMapNodes.css";
import TransformContainer from "./TransformContainer.tsx";

import LL1 from "../../assets/hospitalmaps/00_thelowerlevel1-min.png";
import LL2 from "../../assets/hospitalmaps/00_thelowerlevel2-min.png";
import F1 from "../../assets/hospitalmaps/01_thefirstfloor-min.png";
import F2 from "../../assets/hospitalmaps/02_thesecondfloor-min.png";
import F3 from "../../assets/hospitalmaps/03_thethirdfloor-min.png";

import SelectorTabs from "./SelectorTabs.tsx";
import HoveredNodeData from "./HoveredNodeData.tsx";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import { ServiceRequestNode } from "./ServiceRequestNode.tsx";
import { ServiceRequestsAtNode } from "./ServiceRequestsAtNode.tsx";

const floorNames: string[] = ["LL1", "LL2", "F1", "F2", "F3"];

const mapPath: string[] = [LL2, LL1, F1, F2, F3];
const mapPathNames: string[] = ["L2", "L1", "1", "2", "3"];

interface ImageSize {
  width: number;
  height: number;
}

export function ServiceRequestMode() {
  const [nodes, setNodes] = useState<{ [nodeID: string]: MapNodeInterface }>(
    {},
  );
  const [mapIndex, setMapIndex] = useState(1);
  const [hoveredNode, setHoveredNode] = useState("");
  const [requestCounts, setRequestCounts] = useState<{
    [nodeID: string]: number;
  }>({});
  const [selectedNode, setSelectedNode] = useState("");
  const [requests, setRequests] = useState<ServiceRequestType[]>([]);
  const [imageSizes, setImageSizes] = useState<{ [key: string]: ImageSize }>({
    L1: { width: 0, height: 0 },
    L2: { width: 0, height: 0 },
    "1": { width: 0, height: 0 },
    "2": { width: 0, height: 0 },
    "3": { width: 0, height: 0 },
  });

  useEffect(() => {
    axios.get("/api/map").then((res) => setNodes(res.data));
    axios.get("/api/serviceRequest").then((res) => {
      const payload = res.data as ServiceRequestType[];
      setRequests(payload);
      const counts = payload.reduce(
        (acc, curr) => {
          acc[curr.location] = ++acc[curr.location] || 1;
          return acc;
        },
        {} as { [nodeID: string]: number },
      );
      setRequestCounts(counts);
    });

    const preloadImages = () => {
      mapPath.forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          setImageSizes((prevSizes) => ({
            ...prevSizes,
            [mapPathNames[index]]: {
              width: img.width,
              height: img.height,
            },
          }));
        };
      });
    };

    preloadImages();
  }, []);

  const handleHoveredNode = useCallback((nodeID: string) => {
    setHoveredNode(nodeID);
  }, []);
  const handleSelectedNode = useCallback((nodeID: string) => {
    setSelectedNode(nodeID);
  }, []);

  return (
    <div>
      <div className="total">
        <SelectorTabs
          mapIndex={mapIndex}
          onMapSelect={setMapIndex}
          tabNames={floorNames}
          start={""}
          end={""}
        />
        <TransformContainer>
          <div
            className="map-container"
            style={
              imageSizes[mapPathNames[mapIndex]]
                ? {
                    width: imageSizes[mapPathNames[mapIndex]].width,
                    height: imageSizes[mapPathNames[mapIndex]].height,
                  }
                : {}
            }
          >
            {mapPath.map((path, index) => (
              <img
                key={index}
                src={path}
                alt={`map-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  display: index === mapIndex ? "block" : "none",
                }}
              />
            ))}
            {nodes &&
              Object.values(nodes!)
                .filter((node) => node.floor === mapPathNames[mapIndex])
                .filter((node) => node.nodeType !== "HALL")
                .map((node) => {
                  return (
                    <ServiceRequestNode
                      setHoveredNode={handleHoveredNode}
                      nodeInfo={node}
                      numRequests={requestCounts[node.nodeID]}
                      setSelectedNode={handleSelectedNode}
                      key={node.nodeID}
                    />
                  );
                })}
          </div>
        </TransformContainer>
        <HoveredNodeData node={nodes[hoveredNode]} />
        <ServiceRequestsAtNode nodeID={selectedNode} requests={requests} />
      </div>
    </div>
  );
}
