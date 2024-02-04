import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styling/AddEmployeeForm.css";
//import {useState} from "react";

function AddEmployeeForm() {
  /*
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newDisplayName, setNewDisplayName] = useState("");

    const handleClose = () => {
        setNewUsername("");
        setNewPassword("");
        setNewDisplayName("");
    };

     */

  return (
    <div className={"EmployeeForm"}>
      <Form className={"form-group-required"}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Employee's User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Employee's Username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Employee's Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Employee's Password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDisplayName">
          <Form.Label>Employee's Display Name</Form.Label>
          <Form.Control
            type="displayName"
            placeholder="Employee's Display Name"
            required
          />
          <Form.Text className="text-muted">
            This is the name that will be displayed when the user logs in.
          </Form.Text>
        </Form.Group>
      </Form>

      <div className={"Buttons"}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}

// onClick={handleClose}

export default AddEmployeeForm;
