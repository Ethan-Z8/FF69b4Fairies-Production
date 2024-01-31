import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DropdownMenu from "./DropdownMenu.tsx";

function RequestingService() {
  const [show, setShow] = useState(true);
  const [typeOfService, setTypeOfService] = useState("");
  const [reason, setReason] = useState("");

  const handleClose = () => {
    setShow(false);
    setTypeOfService("");
    setReason("");
  };
  const logData = () => {
    console.log("Type of Service:" + typeOfService, "Reason: " + reason);
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
                l1={"Sanitation"}
                l2={"Facilities"}
                l3={"Patient Transportation"}
                l4={"Security "}
                onSelect={(selectedService) =>
                  setTypeOfService(selectedService)
                }
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

export default RequestingService;
