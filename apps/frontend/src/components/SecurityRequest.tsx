import React, { JSX, useState } from "react";
import { ServiceRequest } from "common/src/types";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

function SecurityRequest(): JSX.Element {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Emergency");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Escort Off Premises");
  const [severity, setSeverity] = useState("5");
  const [status, setStatus] = useState("unassigned");
  const [feedBack, setFeedBack] = useState("");

  async function submit() {
    const data: ServiceRequest = {
      EmployeeName: name,
      Priority: priority,
      Location: location,
      Type: type,
      Severity: severity,
      Status: status,
      MoreInformation: feedBack,
    };
    //sends a post request the /api/high-score
    const res = await axios.post("/api/example", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      console.log("added feedback");
    }
  }
  function clear() {
    setFeedBack("");
    setName("");
    setLocation("");
  }
  return (
    <div className={"screenChange"}>
      <div className={"grid"}>
        <div className={"left-top"}>
          <h1>Employee Name</h1>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type={"text"}
          />
        </div>
        <div className={"left-mid"}>
          <h1>Priority</h1>
          <Select
            name="Priority"
            id="Priority"
            onChange={(e) => {
              setPriority(e.target.value as string);
            }}
          >
            <MenuItem value="Emergency">Emergency</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </div>
        <div className={"left-bot"}>
          <h1>Location</h1>
          <TextField
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type={"text"}
            className={"border-2 p-2 border-black rounded-2xl grow"}
          />
        </div>
        <div className={"right-top"}>
          <h1>Type?</h1>
          <Select
            name="Type"
            id="Type"
            onChange={(e) => {
              setType(e.target.value as string);
            }}
          >
            <MenuItem value="Escort off Premises">Escort off Premises</MenuItem>
            <MenuItem value="Review camera footage">
              Review camera footage
            </MenuItem>
            <MenuItem value="Investigation">Investigation</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </div>
        <div className={"right-mid"}>
          <h1>Status</h1>
          <Select
            name="Severity"
            id="Severity"
            onChange={(e) => {
              setSeverity(e.target.value as string);
            }}
          >
            <MenuItem value="unassigned">unassigned</MenuItem>
            <MenuItem value="assigned">assigned</MenuItem>
            <MenuItem value="in progress">in progress</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
          </Select>
        </div>
        <div className={"right-bot"}>
          <h1>Severity</h1>
          <Select
            name="Status"
            id="Status"
            onChange={(e) => {
              setStatus(e.target.value as string);
            }}
          >
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
          </Select>
        </div>
        <div className={"right-verybottom"}>
          <h1>More Information</h1>
          <TextField
            value={feedBack}
            onChange={(e) => {
              setFeedBack(e.target.value);
            }}
          />
        </div>
        <div>
          <Button onClick={submit} className={"buttonService"}>
            Submit
          </Button>
          <br />
          <br />
          <Button onClick={clear} className={"buttonService"}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecurityRequest;
