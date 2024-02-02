import React from "react";
import "../styling/DisplayMapNodes.css";

interface Node {
  nodeID: string;
  nodeType: string;
  shortName: string;
  xcoord: number;
  ycoord: number;
}

interface NodeOnMapProps {
  node: Node;
  onNodeClick?: (node: Node) => void;
}

const NodeOnMap: React.FC<NodeOnMapProps> = ({ node, onNodeClick }) => {
  const { xcoord, ycoord } = node;

  const handleClick = () => {
    if (onNodeClick) {
      onNodeClick(node);
    } else {
      console.log("clicked:", node);
    }
  };

  return (
    <div
      className="node-circle"
      style={{ left: `${xcoord}px`, top: `${ycoord}px` }}
      onClick={handleClick}
    ></div>
  );
};

export default NodeOnMap;
