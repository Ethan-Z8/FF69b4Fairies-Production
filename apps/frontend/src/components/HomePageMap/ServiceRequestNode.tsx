import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import "../../styling/DisplayMapNodes.css";
import { useCallback } from "react";

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
    top: nodeInfo.xcoord,
    left: nodeInfo.ycoord,
    backgroundColor: numRequests >= 5 ? "#ff69b4" : "#009ca6",
  };
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const t = e.target as HTMLDivElement;
      setSelectedNode(t.id);
    },
    [setSelectedNode],
  );

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
