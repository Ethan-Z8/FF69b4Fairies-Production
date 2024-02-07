import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styling/AddEmployeeForm.css";
import axios from "axios";
import { FormEvent, useState } from "react";

function AddEmployeeForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setDisplayName("");
    setErr(false);
    setSuccess(false);
  };

  const logData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("api/employee/create", {
        username,
        password,
        displayName,
      })
      .then(() => {
        handleClose();
        setSuccess(true);
      })
      .catch(() => {
        setErr(true);
        setSuccess(false);
      });
  };

  return (
    <div className="EmployeeForm">
      <Button className="w-100 mb-3" href="/">
        Back to Home Page
      </Button>
      <Form className={"form-group-required"} onSubmit={logData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee's User Name</Form.Label>
          <Form.Control
            value={username}
            type="text"
            placeholder="Employee's Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Employee's Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Employee's Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mbboo-3" controlId="formDisplayName">
          <Form.Label>Employee's Display Name</Form.Label>
          <Form.Control
            value={displayName}
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
      {err && <div className="text-danger">Error creating user</div>}
      {success && (
        <div className="text-success">Successfully created employee</div>
      )}
    </div>
  );
}

export default AddEmployeeForm;
