import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import axios from "axios";
import { FormEvent, useState } from "react";
import { SanitationRequestFields } from "../components/SanitationRequestFields.tsx";

export function CreateServiceRequestPage() {
  const [typeRequest, setTypeRequest] = useState<string>("Sanitation");

  //TODO: Paste In all
  function extraFields() {
    switch (typeRequest) {
      case "Sanitation":
        return <SanitationRequestFields />;
      case "InternalTransportation":
      case "Medicine":
      case "Maintenance":
      case "Security":
      default:
        return <div />;
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = e.target as HTMLFormElement;
    const payload = Object.fromEntries(new FormData(t)) as {
      [k: string]: string | boolean;
    };

    // If there are any checkboxes, make sure their values are registered here.
    switch (typeRequest) {
      case "Sanitation":
        // When a checkbox is checked, it will have the value 'on'
        // When not checked, it will not be present in the form submission
        // This lie will convert the field to a boolean.
        payload.hazardous = !!payload.hazardous;
        break;
      case "InternalTransportation":
      case "Medicine":
      case "Maintenance":
      case "Security":
      default:
    }
    // axios
    //     .post("/api/serviceRequest/requests", payload)
    //     .then(() => console.log("success"))
    //     .catch(() => console.log("fail"));
    console.log(payload);
    t.reset();
  }

  return (
    <Box
      component="form"
      sx={{
        my: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "75%",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">Create a service request</Typography>
      <FormControl>
        <InputLabel id="typeLabel">Request Type</InputLabel>
        <Select
          label="requestType"
          labelId="typeLabel"
          defaultValue="Sanitation"
          name="requestType"
          onChange={(e) => setTypeRequest(e.target.value)}
        >
          <MenuItem value="Sanitation">Sanitation</MenuItem>
          <MenuItem value="InternalTransportation">
            Internal Transportation
          </MenuItem>
          <MenuItem value="Medicine">Medicine</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Security">Security</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Location" id="location" name="location" required />
      <TextField
        label="Employee Name"
        id="employeeName"
        name="employeeName"
        required
      />
      <FormControl>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          labelId="priority"
          defaultValue="Low"
          name="priority"
          required
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Emergency">Emergency</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          id="status"
          labelId="status"
          defaultValue="Assigned"
          name="status"
          required
        >
          <MenuItem value="Assigned">Assigned</MenuItem>
          <MenuItem value="InProgress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      {extraFields()}
      <Button variant="outlined" type="submit">
        Submit
      </Button>
    </Box>
  );
}
