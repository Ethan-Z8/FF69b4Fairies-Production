import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DropdownMenu from "./DropdownMenu.tsx";
import axios from "axios";

interface differentServices {
  typeOfService1: string;
  typeOfService2: string;
  typeOfService3: string;
  typeOfService4: string;
}

function RequestService({
  typeOfService1,
  typeOfService2,
  typeOfService3,
  typeOfService4,
}: differentServices) {
  const [show, setShow] = useState(true);
  const [typeOfService, setTypeOfService] = useState("");
  const [reason, setReason] = useState("");
  const [nodeLoc, setNodeLoc] = useState("");

  const handleClose = () => {
    setShow(false);
    setTypeOfService("");
    setReason("");
  };
  const logData = () => {
    // console.log(
    //   "Type of Service:" + typeOfService,
    //   "Reason: " + reason,
    //   "NODE LOCATION" + nodeLoc,
    // );
    axios
      .post("/api/serviceRequest/create", {
        typeService: typeOfService,
        reason: reason,
        nodeLoc: nodeLoc,
      })
      .then();
    setShow(false);
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>What kind of Service do you need?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <DropdownMenu
                title="Services"
                l1={typeOfService1}
                l2={typeOfService2}
                l3={typeOfService3}
                l4={typeOfService4}
                onSelect={(selectedService) =>
                  setTypeOfService(selectedService)
                }
                variant={"primary"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Where do you need it?</Form.Label>
              <DropdownMenu
                title="Location"
                l1={"NODE 1"}
                l2={"NODE 2"}
                l3={"NODE 3"}
                l4={"NODE 4"}
                onSelect={(nodeLoc) => setNodeLoc(nodeLoc)}
                variant={"success"}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>What do you need?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={logData}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestService;
