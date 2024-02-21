import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import "../../styling/DisplayMapNodes.css";
import { useState } from "react";

export interface ServiceRequestNodeProps {
  nodeInfo: MapNodeInterface;
  numRequests: number;
  setSelectedNode: (nodeID: string) => void;
}

export function ServiceRequestNode({
  nodeInfo,
  numRequests,
  setSelectedNode,
}: ServiceRequestNodeProps) {
  const [hovered, setHovered] = useState(false);
  const style = {
    top: nodeInfo.ycoord,
    left: nodeInfo.xcoord,
    backgroundColor: numRequests > 0 ? "#ff69b4" : "#009ca6",
    height: 20,
    width: 20,
    transform: `scale(${hovered ? 1.3 : 1}) translate(-50%, -50%)`,
    boxShadow: "1px 2px 2px #00000088",
    transformOrigin: "50%, 50%",
  };

  const handleClick = () => {
    setSelectedNode(nodeInfo.nodeID);
  };

  return (
    <div
      className="node-circle"
      style={style}
      id={nodeInfo.nodeID}
      onClick={handleClick}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    ></div>
  );
}
