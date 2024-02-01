import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styling/DisplayMapNodes.css";
import { CSSProperties } from "react";
import NodeOnMap from "./NodeOnMap.tsx";

interface Node {
  nodeID: string;
  nodeType: string;
  shortName: string;
  xcoord: number;
  ycoord: number;
}

interface DisplayMapNodesProps {
  mapPath: string;
  start: string;
  end: string;
}

interface ImageSize {
  width: number;
  height: number;
}

export function DisplayPath({ mapPath, start, end }: DisplayMapNodesProps) {
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string | null>(
    start,
  );
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string | null>(
    end,
  );
  const [nodes, setNodes] = useState<Node[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [counter, setCounter] = useState(false);

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
        // const pathString = await axios.get(`/api/map/path`, {
        //   params: {
        //     start: start,
        //     end: end,
        //   },
        // });
        //console.log(pathString.data);

        const pathNodes = await axios.get(`/api/map/pathNodes`, {
          params: {
            start: firstClickedNodeId,
            end: secondClickedNodeId,
          },
        });
        const nodesData: Node[] = Object.values(pathNodes.data);
        setNodes(nodesData);
      } catch (error) {
        console.error("Error fetching map nodess:", error);
      }
    };

    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map`);

        const nodesData: Node[] = Object.values(allNodes.data);
        setAllNodes(nodesData);
      } catch (error) {
        console.error("Error fetching map nodess:", error);
      }
    };

    getMapNodes();
    getAllNodes();

    const img = new Image();
    img.src = mapPath;
    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [firstClickedNodeId, secondClickedNodeId, mapPath]);
  const handleNodeClick = (node: Node) => {
    if (!counter) {
      setSecondClickedNodeId("");
      setFirstClickedNodeId(node.nodeID);

      setCounter(true);
    } else {
      setSecondClickedNodeId(node.nodeID);
      setCounter(false);
    }
  };

  const renderPath = (nodes: Node[]) => {
    const circles = nodes.map((one, index) => {
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

    return circles;
  };

  const renderCircles = (allNodes: Node[]) => {
    return allNodes.map((node) => {
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
          src={mapPath}
          alt="map"
          style={{ width: "100%", height: "100%" }}
        />

        <div>{renderCircles(allNodes)}</div>

        <div>{renderPath(nodes)}</div>
      </div>
    </div>
  );
}
