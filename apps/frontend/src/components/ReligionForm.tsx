import React, { ChangeEvent, useState } from "react";
import "../styling/ReligionForm.css";
import RequestButtons from "../components/RequestButtons";
import RequestTable from "./RequestTable";
import axios from "axios";

// export const religionFeedbackArray: ReligionFeedback[] = [];
function ReligionForm() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [religion, setReligion] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const priorityOptions = ["Low", "Medium", "High", "Emergency"];
  const statusOptions = ["Unassigned", "Assigned", "In Progress", "Completed"];

  function submit() {
    axios
      .post("/api/religion/create", {
        name: name,
        priority: priority,
        location: location,
        religion: religion,
        reason: reason,
        status: status,
      })
      .then();
    clear();
    window.location.reload();
  }

  function clear() {
    setName("");
    setPriority("");
    setLocation("");
    setReligion("");
    setReason("");
    setStatus("");
  }

  function getColorForPriority(priority: string): string {
    switch (priority) {
      case "Low":
        return "green";
      case "Medium":
        return "orange";
      case "High":
        return "#ff6347";
      case "Emergency":
        return "#ff0000";
      default:
        return "black"; // Default color for the "Select Priority" option
    }
  }

  function handleReligionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setReligion(e.target.value);
  }

  function handleReasonChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setReason(e.target.value);
  }

  function handleLocationChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setLocation(e.target.value);
  }

  function handleNameChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setName(e.target.value);
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="ReligionDiv">
      <h1>Religion Form</h1>
      <div className={"formDiv"}>
        <div className={"formDiv2"}>
          <div className={"inputDiv"}>
            <p>Employee Name:</p>
            <textarea
              value={name}
              className={"empNameInput"}
              onChange={handleNameChange}
            />
            <p>Religion:</p>
            <textarea
              value={religion}
              className={"religionInput"}
              onChange={handleReligionChange}
            />
            <p>Priority:</p>
            <select
              value={priority}
              onChange={handlePriorityChange}
              className="priorityInput"
            >
              <option value="" style={{ color: "black" }}>
                Select Priority
              </option>
              {priorityOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  style={{ color: getColorForPriority(option) }}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={"inputDiv2"}>
            <p>Location:</p>
            <textarea
              value={location}
              className={"locationInput"}
              onChange={handleLocationChange}
            />
            <p>Type Of Request:</p>
            <textarea
              value={reason}
              className={"reasonInput"}
              onChange={handleReasonChange}
            />
            <p>Status:</p>
            <select
              value={status}
              onChange={handleStatusChange}
              className="statusInput"
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="button">
          <RequestButtons submit={submit} clear={clear} />
        </div>
      </div>
      <div className="requestTable">
        <RequestTable />
      </div>
    </div>
  );
}

export default ReligionForm;
