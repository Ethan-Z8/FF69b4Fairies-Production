import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type FormData = {
  typeService: string;
  reason: string;
  nodeLoc: string;
  employeeName: string;
  progress: "Assigned" | "InProgress" | "Completed";
};

export function CreateServiceRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    typeService: "",
    reason: "",
    nodeLoc: "",
    employeeName: "",
    progress: "Assigned",
  });

  const [err, setErr] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleReset() {
    setFormData({
      typeService: "",
      reason: "",
      nodeLoc: "",
      employeeName: "",
      progress: "Assigned",
    });
    setErr(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("/api/serviceRequest/create", formData)
      .then(() => {
        handleReset();
      })
      .catch(() => setErr(true));
    handleReset();
  }

  return (
    <>
      <Form className="m-auto w-50 mt-5" onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Button href="/">Back to Home Page</Button>
          <FloatingLabel label="Choose Type of service request">
            <Form.Select
              value={formData.typeService}
              name="typeService"
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="Cleanup">Cleanup</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Control
            placeholder="Reason"
            type="textarea"
            as="textarea"
            value={formData.reason}
            name="reason"
            onChange={handleInputChange}
          />
          <Form.Control
            placeholder="Location"
            type="textarea"
            value={formData.nodeLoc}
            name="nodeLoc"
            onChange={handleInputChange}
          />
          <Form.Control
            placeholder="Employee Name"
            type="textarea"
            value={formData.employeeName}
            name="employeeName"
            onChange={handleInputChange}
          />
          <Form.Select
            name="Progress"
            value={formData.progress}
            onChange={handleInputChange}
          >
            <option value="Assigned">Assigned</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Complete</option>
          </Form.Select>
          <Stack direction="horizontal">
            <Button variant="outline-danger" onClick={handleReset} size="lg">
              Reset
            </Button>
            <Button className="ms-auto" type="submit" size="lg">
              Submit
            </Button>
          </Stack>
          {err && (
            <Form.Text className="text-danger">
              Error Creating Service Request
            </Form.Text>
          )}
        </Stack>
      </Form>
    </>
  );
}
