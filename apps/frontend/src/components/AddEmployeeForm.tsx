import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddEmployeeForm() {
  return (
    <Form className={"form-group-required"}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Employee's User Name</Form.Label>
        <Form.Control type="email" placeholder="Employee's Username" required />
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddEmployeeForm;
