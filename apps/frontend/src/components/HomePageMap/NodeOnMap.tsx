import React, { useState, useRef } from "react";
import "../../styling/DisplayMapNodes.css";

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
}

const NodeOnMap: React.FC<NodeOnMapProps> = ({ node }) => {
  const { xcoord, ycoord } = node;
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterNode = () => {
    setIsHovered(true);
    //setIsHoveredPopup(true);
  };

  const handleMouseLeaveNode = () => {
    setIsHovered(false);
    //setIsHoveredPopup(false);
  };

  return (
    <div>
      <div
        className="node-wrapper"
        style={{
          position: "absolute",
          left: `${xcoord}px`,
          top: `${ycoord}px`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={nodeRef}
      >
        <div className="node-circle" />

        {isHovered && (
          <div className="long-name-display">
            <div
              className="node-circle"
              style={{
                position: "absolute",
                width: "24px",
                height: "24px",
                backgroundColor: "red",
                borderRadius: "50%",
                transform: `translate(-12px, -12px)`,
                zIndex: 24,
              }}
              onMouseEnter={handleMouseEnterNode}
              onMouseLeave={handleMouseLeaveNode}
            />
          </div>
        )}
      </div>
      <div
        className="node-wrapper"
        style={{
          position: "absolute",
          left: `${xcoord}px`,
          top: `${ycoord}px`,
        }}
      ></div>
    </div>
  );
};

export default NodeOnMap;
