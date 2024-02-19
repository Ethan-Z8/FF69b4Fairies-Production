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

interface HoveredNodeDataProps {
  node: Node | null;
}

const StartEndSelect: React.FC<HoveredNodeDataProps> = ({ node }) => {
  const [locCollapse, setLocCollapse] = useState(false);

  /*  useEffect(() => {
    if (!node)
      setLocCollapse(false);
  },[node]);*/

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
        width: "10wv",
        right: "8px",
        top: "128px",
        backgroundColor: "white",
        boxShadow: "1px -1px 2px rgba(0, 0, 0, 0.2)",
        padding: "16px",
      }}
    >
      {!locCollapse && node != null && (
        <div>
          <div>{node.longName}</div>
          <div>{node.nodeID}</div>
          <div>{node.nodeType}</div>

          <div>{node.shortName}</div>
          <div>{node.floor}</div>
          <div>{node.building}</div>
        </div>
      )}
      ;
    </div>
  );
};

export default StartEndSelect;
