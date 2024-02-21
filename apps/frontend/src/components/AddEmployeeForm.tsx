import axios from "axios";
import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styling/AddEmployeeForm.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import { Box } from "@mui/material";

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
    console.log(username);
    console.log(password);
    console.log(displayName);
    axios
      .post("api/employee/create", {
        username,
        password,
        displayName,
      })
      .then((res) => {
        console.log(res);
        handleClose();
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setSuccess(false);
      });
  };

  return (
    <div className="EmployeeForm">
      <Form className={"form-group-required"} onSubmit={logData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-username"
              label="Employee Username"
              variant="standard"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Box>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-password"
              label="Password"
              variant="standard"
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Box>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDisplayName">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-displayname"
              label="Display Name"
              variant="standard"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
              sx={{ width: "90%" }}
            />
          </Box>
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
