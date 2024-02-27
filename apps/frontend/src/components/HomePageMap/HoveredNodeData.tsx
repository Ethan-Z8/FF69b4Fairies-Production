import React, { useState } from "react";

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
interface StartEndSelectProps {
  node: Node | null;
  handleNodeHover: (node: Node | null) => void;
}

function StartEndSelect({ node, handleNodeHover }: StartEndSelectProps) {
  const [locCollapse, setLocCollapse] = useState(false);

  // useEffect(() => {
  //   if (!node)
  //     setLocCollapse(false);
  // },[node]);

  const handleCollapse = () => {
    setLocCollapse(!locCollapse);
  };

  return (
    <div
      onClick={handleCollapse}
      style={{
        position: "absolute",
        borderRadius: "16px",
        height: locCollapse ? "48px" : "30vh",
        width: "30wv",
        right: "8px",
        top: "128px",
        backgroundColor: "white",
        boxShadow: "1px -1px 2px rgba(0, 0, 0, 0.2)",
        padding: "16px",
      }}
      onMouseEnter={() => handleNodeHover(node)}
      onMouseLeave={() => handleNodeHover(null)}
    >
      {!locCollapse && node != null && (
        <div>
          <div>{node.longName}</div>
          <div>{node.nodeID}</div>
          <div>Type: {node.nodeType}</div>
          <div>Floor: {node.floor}</div>
          <div>Buidling: {node.building}</div>
          <div>
            Short Name: <br />
            {node.shortName}
          </div>
        </div>
      )}
    </div>
  );
}

export default StartEndSelect;
