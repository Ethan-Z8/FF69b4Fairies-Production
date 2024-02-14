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
  const { xcoord, ycoord, longName } = node;
  const [isHovered, setIsHovered] = useState(false);
  //const [isHoveredPopup, setIsHoveredPopup] = useState(false);

  const [isClicked, setIsClicked] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [hoverShift, setHoverShift] = useState(-24);
  const handleClick = () => {
    if (onNodeClick) {
      setHoverShift(-24);
      setIsClicked(!isClicked);
      onNodeClick(node);
    } else {
      console.log("");
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    setHoverShift(142);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    setHoverShift(-24);
  };

  const handleMouseEnterNode = () => {
    setHoverShift(-24);
    setIsHovered(true);
    //setIsHoveredPopup(true);
  };

  const handleMouseLeaveNode = () => {
    setIsHovered(false);
    //setIsHoveredPopup(false);
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
      {isHovered && !isClicked && (
        <div
          className="popup"
          style={{
            width: `${15}vw`,
            position: "absolute",
            zIndex: 23,
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
          <p>Short Name: {node.shortName}</p>
          <p>Floor: {node.floor}</p>
          <p>Building: {node.building}</p>
          <p>Node Type: {node.nodeType}</p>
        </div>
      )}
      {isClicked && (
        <div className="long-name-display">
          <div
            className="popup"
            style={{
              width: `${18}vw`,
              height: `${30}vw`,
              position: "absolute",
              zIndex: 19,
              backgroundColor: "transparent",
              bottom: "-128%",
              left: "50%",
              transform: `translate(-50%, 142px)`,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          ></div>
          <div
            className="popup"
            style={{
              width: `${15}vw`,
              position: "absolute",
              zIndex: `${isHovered ? 22 : 20}`,
              backgroundColor: "#fff",
              bottom: "-128%",
              left: "50%",
              transform: `translate(-50%, ${hoverShift}px)`,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <p>{longName}</p>
          </div>
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
  );
};

export default NodeOnMap;
