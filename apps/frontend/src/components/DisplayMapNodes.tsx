import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styling/DisplayMapNodes.css";

interface Node {
  nodeID: string;
  nodeType: string;
  shortName: string;
  xcoord: number;
  ycoord: number;
}

interface ImageSize {
  width: number;
  height: number;
}

export function DisplayMapNodes({ mapPath }: { mapPath: string }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);

  async function getMapNodes() {
    try {
      const allNodes = await axios.get("/api/map");
      const nodesData: Node[] = Object.values(allNodes.data);
      console.log(nodesData);
      setNodes(nodesData);
    } catch (error) {
      console.error("Error fetching map nodes:", error);
    }
  }

  useEffect(() => {
    getMapNodes();

    const img = new Image();
    img.src = mapPath;
    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [mapPath]);

  const renderCircles = (nodes: Node[]) => {
    return nodes.map((node) => {
      return (
        <div
          key={node.nodeID}
          className="node-circle"
          style={{ left: `${node.xcoord}px`, top: `${node.ycoord}px` }}
        ></div>
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
        <div>{renderCircles(nodes)}</div>
      </div>
    </div>
  );
}
