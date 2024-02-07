import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";
import "../styling/DisplayMapNodes.css";
import { CSSProperties } from "react";
import NodeOnMap from "./NodeOnMap.tsx";

import GR from "../assets/hospitalmaps/00_thegroundfloor.png";
import LL1 from "../assets/hospitalmaps/00_thelowerlevel1.png";
import LL2 from "../assets/hospitalmaps/00_thelowerlevel2.png";
import F1 from "../assets/hospitalmaps/01_thefirstfloor.png";
import F2 from "../assets/hospitalmaps/02_thesecondfloor.png";
import F3 from "../assets/hospitalmaps/03_thethirdfloor.png";

// PLACEHOLDER CONTEXT replace later :3
const MapContext = createContext(1);

interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  neighbors: Array<string>;
}

interface ImageSize {
  width: number;
  height: number;
}
const mapPath = [GR, LL1, LL2, F1, F2, F3];
interface DisplayPathProps {
  toggleNodes: boolean;
  toggleEdges: boolean;
  start: string;
  end: string;
}

export function DisplayPath({
  toggleNodes,
  toggleEdges,
  start,
  end,
}: DisplayPathProps) {
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string | null>(
    null,
  );
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string | null>(
    null,
  );
  const [nodes, setNodes] = useState<Node[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [counter, setCounter] = useState(false);
  const mapIndex = useContext(MapContext);
  const [aNodes, setANodes] = useState<{ [key: string]: Node }>({});

  // error listener
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;

    if (reason instanceof Error) {
      // If the reason is an instance of Error, you can handle it accordingly
      console.error("Unhandled Promise Rejection:", reason);
    } else {
      // If the reason is of unknown type, you might want to handle it gracefully
      console.warn("Unhandled Promise Rejection with unknown reason:", reason);
    }
  });

  useEffect(() => {
    const getMapNodes = async () => {
      try {
        const pathNodes = await axios.get(`/api/map/pathNodes`, {
          params: {
            start: firstClickedNodeId,
            end: secondClickedNodeId,
          },
        });
        const nodesData: Node[] = Object.values(pathNodes.data);
        setNodes(nodesData);
      } catch (error) {
        console.log("Error has not selected 2 nodes ");
      }
    };

    const getMapNodesByShort = async () => {
      try {
        const pathNodes = await axios.get(`/api/map/pathNodesShort`, {
          params: {
            start: start,
            end: end,
          },
        });
        const nodesData: Node[] = Object.values(pathNodes.data);
        setNodes(nodesData);
      } catch (error) {
        console.log("Error has not selected 2 nodes ");
      }
    };

    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);

        const nodesData: Node[] = Object.values(allNodes.data);
        setAllNodes(nodesData);
      } catch (error) {
        console.error("Error fetching map nodess:", error);
      }
    };

    const all = async () => {
      try {
        const response = await axios.get(`/api/map/allTemp`);
        const aNodes: { [key: string]: Node } = response.data;
        setANodes(aNodes);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };

    if (secondClickedNodeId != null && firstClickedNodeId != null) {
      getMapNodes();
    }

    if (start != "" && end != "") {
      getMapNodesByShort();
    }
    all();
    getAllNodes();

    const img = new Image();
    img.src = mapPath[mapIndex];
    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [firstClickedNodeId, secondClickedNodeId, mapIndex, start, end]);

  const handleNodeClick = (node: Node) => {
    if (!counter) {
      setSecondClickedNodeId(null);
      setFirstClickedNodeId(null);
      setFirstClickedNodeId(node.nodeID);

      setCounter(true);
    } else {
      setSecondClickedNodeId(node.nodeID);
      setCounter(false);
    }
  };

  const renderPath = () => {
    let circles: JSX.Element[];
    if (toggleEdges) {
      const visitedNodeIDs = new Set<string>();

      circles = allNodes
        .map((node) => {
          if (visitedNodeIDs.has(node.nodeID)) {
            return <div />;
          }

          visitedNodeIDs.add(node.nodeID);

          return node.neighbors.map((nNode) => {
            const prevNode = aNodes[nNode];
            if (!prevNode) return <div />; // Skip if prevNode is undefined

            const lineStyles: React.CSSProperties = {
              position: "absolute",
              left: `${prevNode.xcoord}px`,
              top: `${prevNode.ycoord}px`,
              width: `${Math.sqrt(
                Math.pow(node.xcoord - prevNode.xcoord, 2) +
                  Math.pow(node.ycoord - prevNode.ycoord, 2),
              )}px`,
              height: "4px",
              backgroundColor: "red",
              zIndex: 3,
              transformOrigin: "left center",
              transform: `rotate(${Math.atan2(
                node.ycoord - prevNode.ycoord,
                node.xcoord - prevNode.xcoord,
              )}rad)`,
            };
            const uniqueKey = `${nNode}-${node.nodeID}`;
            return (
              <div key={uniqueKey} className="node-wrapper">
                <div className="line" style={lineStyles}></div>
              </div>
            );
          });
          return <div />;
        })
        .flat();
    } else {
      circles = nodes.map((one, index) => {
        // console.log(nodes); // Log nodeID to console
        // console.log("inside rendercircles");

        // Calculate previous node index
        const prevIndex = index - 1;
        const prevNode = prevIndex >= 0 ? nodes[prevIndex] : null;

        // Calculate line coordinates and rotation angle
        const lineStyles: CSSProperties = prevNode
          ? {
              position: "absolute",
              left: `${prevNode.xcoord}px`,
              top: `${prevNode.ycoord}px`,
              width: `${Math.sqrt(
                Math.pow(one.xcoord - prevNode.xcoord, 2) +
                  Math.pow(one.ycoord - prevNode.ycoord, 2),
              )}px`, // Adjust thickness as needed
              height: "4px", // Adjust thickness as needed
              backgroundColor: "red",
              zIndex: 3, // Set a higher zIndex for the line
              transformOrigin: "left center",
              transform: `rotate(${Math.atan2(
                one.ycoord - prevNode.ycoord,
                one.xcoord - prevNode.xcoord,
              )}rad)`,
            }
          : {};

        return (
          <div key={one.nodeID} className="node-wrapper">
            {prevNode && <div className="line" style={lineStyles}></div>}
          </div>
        );
      });
    }

    return circles;
  };

  const renderCircles = () => {
    if (toggleNodes)
      return allNodes.map((node) => {
        return (
          <div key={node.nodeID}>
            <NodeOnMap node={node} onNodeClick={() => handleNodeClick(node)} />
          </div>
        );
      });
    else
      return nodes.map((node) => {
        return (
          <div key={node.nodeID}>
            <NodeOnMap node={node} onNodeClick={() => handleNodeClick(node)} />
          </div>
        );
      });
  };

  return (
    <div className="total">
      <div
        className="map-container"
        style={
          imageSize ? { width: imageSize.width, height: imageSize.height } : {}
        }
      >
        <img
          src={mapPath[mapIndex]}
          alt="map"
          style={{ width: "100%", height: "100%" }}
        />

        <div>{renderCircles()}</div>

        <div>{renderPath()}</div>
      </div>
    </div>
  );
}
