import React, { useState, useRef } from "react";
import "../styling/DisplayMapNodes.css";

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

interface NodeOnMapProps {
  node: Node;
  onNodeClick?: (node: Node) => void;
}

const NodeOnMap: React.FC<NodeOnMapProps> = ({ node, onNodeClick }) => {
  const { xcoord, ycoord, longName, shortName, floor, building, nodeType } =
    node;
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onNodeClick) {
      onNodeClick(node);
    } else {
      console.log("clicked:", node);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="node-wrapper"
      style={{
        position: "absolute",
        left: `${xcoord}px`,
        top: `${ycoord}px`,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={nodeRef}
    >
      <div className="node-circle" />
      {isHovered && (
        <div
          className="popup"
          style={{
            width: `${15}vw`,
            position: "absolute",
            zIndex: 20,
            backgroundColor: "#fff",
            bottom: "-120%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p>{longName}</p>
          <p>ID: {node.nodeID}</p>
          <p>Short Name: {shortName}</p>
          <p>Floor: {floor}</p>
          <p>Building: {building}</p>
          <p>Node Type: {nodeType}</p>
        </div>
      )}
    </div>
  );
};

export default NodeOnMap;
