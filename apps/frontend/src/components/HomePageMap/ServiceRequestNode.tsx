import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import "../../styling/DisplayMapNodes.css";

export interface ServiceRequestNodeProps {
  nodeInfo: MapNodeInterface;
  numRequests: number;
  setSelectedNode: (nodeID: string) => void;
}

export function ServiceRequestNode({
  nodeInfo,
  numRequests,
  // setSelectedNode,
}: ServiceRequestNodeProps) {
  const style = {
    top: nodeInfo.xcoord,
    left: nodeInfo.ycoord,
    backgroundColor: numRequests >= 5 ? "#ff69b4" : "#009ca6",
  };
  return <div className="node-circle" style={style}></div>;
}
