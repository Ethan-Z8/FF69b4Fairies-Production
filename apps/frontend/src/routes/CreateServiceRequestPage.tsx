import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

type FormData = {
  type: string;
  location: string;
  description: string;
};
export function CreateServiceRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    location: "",
    description: "",
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
      type: "",
      location: "",
      description: "",
    });
    setErr(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    axios
      .post("/api/serviceRequest/create", formData, {
        baseURL: "http://localhost",
      })
      .then((res) => console.log(res));
    handleReset();
  }

  return (
    <>
      <Form className="m-auto w-50 mt-5" onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Button href="/">Back to Home Page</Button>
          <FloatingLabel label="Choose Type of service request">
            <Form.Select
              value={formData.type}
              name="type"
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="Request Nurse">Request Nurse</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label="Choose Location of service request">
            <Form.Select
              value={formData.location}
              name="location"
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="Entrance">Entrance</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Control
            placeholder="Additional Details"
            as="textarea"
            value={formData.description}
            name="description"
            onChange={handleInputChange}
          />
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
