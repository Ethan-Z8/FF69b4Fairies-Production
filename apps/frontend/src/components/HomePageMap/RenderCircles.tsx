import React from "react";
import NodeOnMap from "../NodeOnMap.tsx";

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

interface Props {
  toggleNodes: boolean;
  floor: string;
  allNodes: Node[];
  pathNodes: Node[];
  handleNodeClick: (node: Node) => void;
}

const RenderCircles: React.FC<Props> = ({
  toggleNodes,
  floor,
  allNodes,
  pathNodes,
  handleNodeClick,
}) => {
  return toggleNodes
    ? allNodes
        .filter((node) => node.floor === floor && node.nodeType !== "HALL")
        .map((node) => (
          <div key={node.nodeID}>
            <NodeOnMap node={node} onNodeClick={() => handleNodeClick(node)} />
          </div>
        ))
    : pathNodes
        .filter((node) => node.floor === floor)
        .map((node: Node) => (
          <div key={node.nodeID}>
            <NodeOnMap node={node} onNodeClick={() => handleNodeClick(node)} />
          </div>
        ));
};

export default RenderCircles;
