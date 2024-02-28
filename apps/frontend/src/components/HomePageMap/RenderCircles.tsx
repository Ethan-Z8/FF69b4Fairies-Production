import React, { useRef } from "react";
import NodeOnMap from "./NodeOnMap.tsx";

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
  handleNodeHover: (node: Node | null) => void;
  setPosition: (position: { x: number | null; y: number | null }) => void;
}

const RenderCircles: React.FC<Props> = ({
  toggleNodes,
  floor,
  allNodes,
  pathNodes,
  handleNodeClick,
  handleNodeHover,
  setPosition,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (itemRef.current) {
      const { left, top } = itemRef.current.getBoundingClientRect();
      setPosition({ x: left, y: top });
    }
  };

  return toggleNodes
    ? allNodes
        .filter((node) => node.floor === floor && node.nodeType !== "HALL")
        .map((node) => (
          <div
            key={node.nodeID}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={() => handleNodeHover(null)}
            ref={itemRef}
            onClick={() => {
              handleNodeClick(node);
              handleClick();
            }}
          >
            <NodeOnMap node={node} />
          </div>
        ))
    : pathNodes
        .filter((node) => node.floor === floor)
        .map((node: Node) => (
          <div
            key={node.nodeID}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={() => handleNodeHover(null)}
            ref={itemRef}
            onClick={() => {
              handleNodeClick(node);
              handleClick();
            }}
          >
            <NodeOnMap node={node} />
          </div>
        ));
};

export default RenderCircles;
