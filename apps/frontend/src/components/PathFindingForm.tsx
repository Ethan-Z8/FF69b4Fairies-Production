import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function PathFindingForm() {
  const [show, setShow] = useState(true);
  const [path1, setPath1] = useState("");
  const [path2, setPath2] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Path1: " + path1);
    console.log("Path2: " + path2);
    setPath1("");
    setPath2("");
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
              onChange={(e) => setPath1(e.target.value)}
              type={"text"}
              value={path1}
            />
            <h4>Second Location</h4>
            <input
              onChange={(e) => setPath2(e.target.value)}
              type={"text"}
              value={path2}
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
