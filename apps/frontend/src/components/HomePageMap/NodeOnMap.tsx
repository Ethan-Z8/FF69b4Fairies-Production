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
  onNodeClick?: (node: Node) => void;
}

const NodeOnMap: React.FC<NodeOnMapProps> = ({ node, onNodeClick }) => {
  const { xcoord, ycoord, longName } = node;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [hoverShift, setHoverShift] = useState(true);
  let clickTimer: ReturnType<typeof setTimeout>;

  const [reachedTimeout, setReachedTimeout] = useState(false);

  const handleClick = () => {
    if (onNodeClick) {
      clearTimeout(clickTimer);
      if (!reachedTimeout) {
        onNodeClick(node);
      }
    } else {
      console.log("");
    }
  };

  const handleMouseDown = () => {
    clickTimer = setTimeout(() => {
      setIsClicked(!isClicked);
      setReachedTimeout(true);
    }, 500);
  };

  const handleMouseUp = () => {
    clearTimeout(clickTimer);
  };

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

  const handleMouseEnterPopup = () => {
    setHoverShift(!hoverShift);
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
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
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
      >
        {isClicked && (
          <div onMouseEnter={handleMouseEnterPopup}>
            <div
              className="popup"
              style={{
                width: `${15}vw`,
                position: "absolute",
                zIndex: `${isHovered ? 22 : 20}`,
                backgroundColor: "#fff",
                bottom: "-128%",
                left: "50%",
                transform: `translate(-50%, ${hoverShift ? 130 : -30}%)`,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: 30,
              }}
            >
              <p>{longName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeOnMap;
