import React, { useState } from "react";
import { DisplayPath } from "../components/DisplayPath.tsx";
import TransformContainer from "../components/TransformContainer.tsx";
import Button from "react-bootstrap/Button";

function HomePage() {
  const [toggleNodes, setToggleNodes] = useState(false);
  const handleToggle = () => {
    setToggleNodes(!toggleNodes);
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
        <Button onClick={handleToggle}>
          Nodes: {toggleNodes ? "on" : "off"}
        </Button>
      </div>
      <TransformContainer>
        <DisplayPath toggleNodes={toggleNodes} />
      </TransformContainer>
    </div>
  );
}

export default HomePage;
