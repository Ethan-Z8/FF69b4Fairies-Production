// import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { SanitationRequestFields } from "../components/SanitationRequestFields.tsx";
import { MaintenanceRequestFields } from "../components/MaintenanceRequestFields.tsx";
import { ReligionRequestFields } from "../components/ReligionRequestFields.tsx";
import { InternalTransportationFields } from "../components/InternalTransportationFields.tsx";
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
  const [nodes, setNodes] = useState<MapNodeInterface[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/map")
      .then((res) => {
        setNodes(Array.from(Object.values(res.data)));
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
        return <InternalTransportationFields nodes={nodes} />;
      case "Religion":
        return <ReligionRequestFields />;
      case "Maintenance":
        return <MaintenanceRequestFields />;
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
        break;
    }
    // axios
    //     .post("/api/serviceRequest/requests", payload)
    //     .then(() => console.log("success"))
    //     .catch(() => console.log("fail"));
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
            <MenuItem value="Flowers">Flowers</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Religion">Religious</MenuItem>
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
            {nodes.map((node) => {
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
          id="employeeName"
          name="employeeName"
          required
        />
        {extraFields()}
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
            defaultValue="Unassigned"
            name="status"
            required
          >
            <MenuItem value="Unassigned">Unassigned</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Box>
    )
  );
}
