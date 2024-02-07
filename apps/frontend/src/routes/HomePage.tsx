import React, { useState, useRef } from "react";
import { DisplayPath } from "../components/DisplayPath.tsx";
import TransformContainer from "../components/TransformContainer.tsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function HomePage() {
  const [toggleNodes, setToggleNodes] = useState(false);
  const [toggleEdges, setToggleEdges] = useState(false);
  const [shortNamePair, setShortNamePair] = useState({ start: "", end: "" });

  const startRef = useRef<HTMLInputElement>(null); // Define the type of the ref
  const endRef = useRef<HTMLInputElement>(null); // Define the type of the ref

  const handleToggleNodes = () => {
    setToggleNodes(!toggleNodes);
  };

  const handleToggleEdges = () => {
    setToggleEdges(!toggleEdges);
  };

  const handleGeneratePath = () => {
    if (startRef.current && endRef.current) {
      const startValue = startRef.current.value;
      const endValue = endRef.current.value;
      setShortNamePair({ start: startValue, end: endValue });
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "5vh",
          right: "5vw",
          zIndex: "4",
          width: "10%",
        }}
      >
        <Form.Group controlId="start">
          <Form.Control ref={startRef} type="text" placeholder="Enter start" />
        </Form.Group>
        <Form.Group controlId="end">
          <Form.Control ref={endRef} type="text" placeholder="Enter end" />
        </Form.Group>
        <Button
          onClick={handleGeneratePath}
          style={{
            width: "10vw",
            marginBottom: "10px",
          }}
        >
          Generate Path
        </Button>
        <Button
          onClick={handleToggleNodes}
          style={{
            width: "10vw",
          }}
        >
          Nodes: {toggleNodes ? "on" : "off"}
        </Button>
        <Button
          onClick={handleToggleEdges}
          style={{
            width: "10vw",
          }}
        >
          Edges: {toggleEdges ? "on" : "off"}
        </Button>
      </div>
      <TransformContainer>
        <DisplayPath
          toggleNodes={toggleNodes}
          toggleEdges={toggleEdges}
          start={shortNamePair.start}
          end={shortNamePair.end}
        />
      </TransformContainer>
    </div>
  );
}

export default HomePage;
