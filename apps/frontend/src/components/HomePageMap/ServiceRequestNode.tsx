import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import "../../styling/DisplayMapNodes.css";

export interface ServiceRequestNodeProps {
  nodeInfo: MapNodeInterface;
  numRequests: number;
  setSelectedNode: (nodeID: string) => void;
  setHoveredNode: (node: string) => void;
}

export function ServiceRequestNode({
  nodeInfo,
  numRequests,
  setSelectedNode,
  setHoveredNode,
}: ServiceRequestNodeProps) {
  const style = {
    top: nodeInfo.ycoord,
    left: nodeInfo.xcoord,
    backgroundColor: numRequests >= 5 ? "#ff69b4" : "#009ca6",
    height: 16,
    width: 15,
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
      onMouseEnter={(e) => setHoveredNode((e.target as HTMLDivElement).id)}
      onMouseLeave={() => setHoveredNode("")}
    ></div>
  );
}
