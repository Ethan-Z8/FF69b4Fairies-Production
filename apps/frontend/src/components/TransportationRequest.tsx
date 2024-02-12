import { Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

type TransportationRequest = {
  employeeName: string;
  patientName: string;
  currentLocation: string;
  destinationLocation: string;
  time2Move: string;
  time2Return: string;
  reason: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Unassigned" | "Assigned" | "InProgress" | "Completed";
};

export function TransportationRequest() {
  const [requestData, setRequestData] = useState<TransportationRequest>({
    employeeName: "",
    patientName: "",
    currentLocation: "",
    destinationLocation: "",
    time2Move: "",
    time2Return: "",
    reason: "",
    priority: "Low",
    status: "Unassigned",
  });

  const [err, setErr] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  }

  function handleReset() {
    setRequestData({
      employeeName: "",
      patientName: "",
      currentLocation: "",
      destinationLocation: "",
      time2Move: "",
      time2Return: "",
      reason: "",
      priority: "Low",
      status: "Unassigned",
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("/api/serviceRequest/create", requestData)
      .then(() => {
        handleReset();
      })
      .catch(() => setErr(true));
    handleReset();
  }
  //in future the employee name should be autofilled by someone who is signed in

  return (
    <div>
      <h1>Internal Patient Transportation Request</h1>
      <Form className="m-auto w-75" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            placeholder="Employee Name"
            type="text"
            as="input"
            value={requestData.employeeName}
            name="employeeName"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            placeholder="Patient Name"
            type="text"
            as="input"
            value={requestData.patientName}
            name="patientName"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Patient's Current Location</Form.Label>
          <Form.Control
            placeholder="Patient's Current Location"
            type="text"
            as="input"
            value={requestData.currentLocation}
            name="currentLocation"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Patient's Destination</Form.Label>
          <Form.Control
            placeholder="Patient's Destination Location"
            type="text"
            as="input"
            value={requestData.destinationLocation}
            name="destinationLocation"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Reason for Relocation</Form.Label>
          <Form.Control
            placeholder="Reason for Relocation"
            type="text"
            as="input"
            value={requestData.reason}
            name="reason"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Time to Move Patient</Form.Label>
          <Form.Control
            placeholder="Time to Move Patient"
            type="text"
            as="input"
            value={requestData.time2Move}
            name="time2Move"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Time to Return Patient</Form.Label>
          <Form.Control
            placeholder="Time to Return Patient"
            type="text"
            as="input"
            value={requestData.time2Move}
            name="time2Move"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={"mb-3"}>
          <Form.Label>Transportation Request Priority</Form.Label>
          <Form.Select
            name="priority"
            value={requestData.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Transportation Request Progress</Form.Label>
          <Form.Select
            name="status"
            value={requestData.status}
            onChange={handleInputChange}
          >
            <option value="Unassigned">Unassigned</option>
            <option value="Assigned">Assigned</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Complete</option>
          </Form.Select>
        </Form.Group>
        <div className={"buttonStack"}>
          <Stack direction="horizontal">
            <Button variant="outline-danger" onClick={handleReset} size="lg">
              Reset
            </Button>
            <Button className="ms-auto" type="submit" size="lg">
              Submit
            </Button>
          </Stack>
        </div>
        {err && (
          <Form.Text className="text-danger">
            Error Creating Service Request
          </Form.Text>
        )}
      </Form>
    </div>
  );
}

export default TransportationRequest;
