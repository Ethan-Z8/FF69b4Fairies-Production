import React, { useState } from "react";
import { DisplayPath } from "../components/DisplayPath.tsx";
import TransformContainer from "../components/TransformContainer.tsx";
import Button from "react-bootstrap/Button";

function HomePage() {
  const [toggleNodes, setToggleNodes] = useState(false);
  const [toggleEdges, setToggleEdges] = useState(false);

  const handleToggleNodes = () => {
    setToggleNodes(!toggleNodes);
  };
  const handleToggleEdges = () => {
    setToggleEdges(!toggleEdges);
  };
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "5vh",
          right: "5vw",
          zIndex: "4",
        }}
      >
        <Button onClick={handleToggleNodes}>
          Nodes: {toggleNodes ? "on" : "off"}
        </Button>
        <Button onClick={handleToggleEdges}>
          Edges: {toggleEdges ? "on" : "off"}
        </Button>
      </div>
      <TransformContainer>
        <DisplayPath toggleNodes={toggleNodes} toggleEdges={toggleEdges} />
      </TransformContainer>
    </div>
  );
}

export default HomePage;
