import React, { useState } from "react";
import { DisplayPath } from "../components/DisplayPath.tsx";
import TransformContainer from "../components/TransformContainer.tsx";
import Button from "react-bootstrap/Button";
import NodeSelectDropdown from "../components/NodeSelectDropdown.tsx";

function HomePage() {
  const [toggleNodes, setToggleNodes] = useState(false);
  const [toggleEdges, setToggleEdges] = useState(false);
  const [shortNamePair, setShortNamePair] = useState({ start: "", end: "" });
  const [start, setStart] = useState<string>("Start");
  const [end, setEnd] = useState<string>("End");
  //const startRef = useRef<HTMLInputElement>(null);
  //const endRef = useRef<HTMLInputElement>(null);

  const handleToggleNodes = () => {
    setToggleNodes(!toggleNodes);
  };

  const handleToggleEdges = () => {
    setToggleEdges(!toggleEdges);
  };

  const handleGeneratePath = () => {
    setShortNamePair({ start: start, end: end });
    console.log(shortNamePair);
  };

  return (
    <div>
      <div>
        {}
        <div
          style={{
            position: "fixed",
            top: "20vh",
            right: "5vw",
            zIndex: "4",
            width: "20%",
          }}
        >
          <NodeSelectDropdown
            label={start}
            onSelect={(value) => setStart(value)}
          />
          <NodeSelectDropdown label={end} onSelect={(value) => setEnd(value)} />
          <Button
            onClick={handleGeneratePath}
            style={{
              width: "10vw",
              marginBottom: "10px",
            }}
          >
            Generate Path
          </Button>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "5vh",
            right: "5vw",
            zIndex: "4",
            width: "10%",
            float: "right",
          }}
        >
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
