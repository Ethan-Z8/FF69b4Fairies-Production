import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styling/AddEmployeeForm.css";
import axios from "axios";
import { FormEvent, useState } from "react";

function AddEmployeeForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setDisplayName("");
  };

  const logData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*
        console.log(
          "New Username: " + username,
          "New Password: " + password,
          "New Display Name: " + displayName,
        );

           */

    axios
      .post("api/employee/create", {
        username,
        password,
        displayName,
      })
      .then();
  };

  return (
    <div className={"EmployeeForm"}>
      <Form className={"form-group-required"} onSubmit={logData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee's User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Employee's Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Employee's Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Employee's Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDisplayName">
          <Form.Label>Employee's Display Name</Form.Label>
          <Form.Control
            type="displayName"
            placeholder="Employee's Display Name"
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Form.Text className="text-muted">
            This is the name that will be displayed when the user logs in.
          </Form.Text>
        </Form.Group>
        <div className={"Buttons"}>
          <Button
            variant="outline-danger"
            className="me-auto"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddEmployeeForm;
