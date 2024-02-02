import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export type PathFindingFormProps = {
  startNode: string;
  setStartNode: (value: string) => void;
  endNode: string;
  setEndNode: (value: string) => void;
  onFormSubmit: () => void;
};

function PathFindingForm({
  startNode,
  setStartNode,
  endNode,
  setEndNode,
  onFormSubmit,
}: PathFindingFormProps) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Path1: " + startNode);
    console.log("Path2: " + endNode);
    onFormSubmit();
    setShow(false);
  };

  return (
    <>
      <Offcanvas placement="top" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Path Finding</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit}>
            <h4>First Location</h4>
            <input
              onChange={(e) => setStartNode(e.target.value)}
              type={"text"}
              value={startNode}
            />
            <h4>Second Location</h4>
            <input
              onChange={(e) => setEndNode(e.target.value)}
              type={"text"}
              value={endNode}
            />
            <br />
            <Button variant="primary" type="submit">
              Generate Path
            </Button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PathFindingForm;
