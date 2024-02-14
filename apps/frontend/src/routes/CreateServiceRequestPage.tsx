// import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { SanitationRequestFields } from "../components/SanitationRequestFields.tsx";
import { MaintenanceRequestFields } from "../components/MaintenanceRequestFields.tsx";
import { ReligionRequestFields } from "../components/ReligionRequestFields.tsx";
import { InternalTransportationFields } from "../components/InternalTransportationFields.tsx";
import { FlowerRequestFields } from "../components/FlowerRequestFields.tsx";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import axios from "axios";
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

//TODO: Make the location selectors autocomplete forms, not basic select forms
export function CreateServiceRequestPage() {
  const [typeRequest, setTypeRequest] = useState<string>("Sanitation");
  const [nodes, setNodes] = useState<{ [key: string]: MapNodeInterface }>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/map")
      .then((res) => {
        setNodes(res.data);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  //TODO: Paste In all
  function extraFields() {
    switch (typeRequest) {
      case "Sanitation":
        return <SanitationRequestFields />;
      case "InternalTransportation":
        return <InternalTransportationFields nodes={Object.values(nodes)} />;
      case "Religious":
        return <ReligionRequestFields />;
      case "Maintenance":
        return <MaintenanceRequestFields />;
      case "Flowers":
        return <FlowerRequestFields />;
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
      default:
        break;
    }
    axios
      .post("/api/serviceRequest/create", payload)
      .then(() => {
        console.log("success");
        setSuccess(true);
        setError(false);
      })
      .catch(() => {
        console.log("fail");
        setSuccess(false);
        setError(true);
      });
    console.log(payload);
    t.reset();
  }

  return (
    loaded && (
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
            label="Request Type"
            labelId="typeService"
            defaultValue="Sanitation"
            name="typeService"
            onChange={(e) => setTypeRequest(e.target.value)}
          >
            <MenuItem value="Sanitation">Sanitation</MenuItem>
            <MenuItem value="InternalTransportation">
              Internal Transportation
            </MenuItem>
            <MenuItem value="Flowers">Flowers</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Religious">Religious</MenuItem>
          </Select>
        </FormControl>
        {/*<TextField label="Location" id="location" name="location" required />*/}
        <FormControl>
          <InputLabel>Location</InputLabel>
          <Select
            key="location"
            label="Location"
            id="location"
            name="location"
            defaultValue=""
            required
          >
            {Object.values(nodes).map((node) => {
              return (
                <MenuItem key={node.nodeID} value={node.nodeID}>
                  {node.longName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          label="Employee Name"
          id="employee"
          name="employee"
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
            label="Progress"
            id="progress"
            labelId="progress"
            defaultValue="Unassigned"
            name="progress"
            required
          >
            <MenuItem value="Unassigned">Unassigned</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        {extraFields()}
        <Button variant="outlined" type="submit">
          Submit
        </Button>
        {success && (
          <Typography
            sx={{
              color: "success.main",
            }}
          >
            Successfully Created Service Request
          </Typography>
        )}
        {error && (
          <Typography
            sx={{
              color: "error.main",
            }}
          >
            Error Creating Service Request
          </Typography>
        )}
      </Box>
    )
  );
}
