import React, { useEffect, useState } from "react";
import { ReligionFeedback } from "../../../backend/src/ReligionFeedback";
import "../styling/RequestTable.css";
import axios from "axios";

const ReligionFeedbackTable: React.FC = () => {
  const [feedbackArray, setFeedbackArray] = useState<ReligionFeedback[]>([]);
  const [cancellingIndex, setCancellingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data using axios.get when the component mounts
    axios
      .get("/api/religion")
      .then((response) => {
        // Assuming the response data is an array of ReligionFeedback
        setFeedbackArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleCancel = (index: number) => {
    // Set the index of the row to be cancelled and show confirmation modal
    setCancellingIndex(index);
  };

  const confirmCancel = (confirmed: boolean) => {
    if (confirmed && cancellingIndex !== null) {
      // Handle cancellation logic here
      // Update feedbackArray by filtering out the canceled row
      setFeedbackArray((prevArray) =>
        prevArray.filter((_, index) => index !== cancellingIndex),
      );

      // Clear the cancelling index to close the confirmation modal
      setCancellingIndex(null);
    } else {
      // If not confirmed or cancellingIndex is null, close the confirmation modal
      setCancellingIndex(null);
    }
  };

  return (
    <div className={"ReqTable"}>
      <h1>Religious Requests Log</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Location</th>
            <th>Religion</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackArray.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.priority}</td>
              <td>{feedback.location}</td>
              <td>{feedback.religion}</td>
              <td>{feedback.reason}</td>
              <td>{feedback.status}</td>
              <td>
                <button onClick={() => handleCancel(index)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cancellingIndex !== null && (
        <div className="confirmation-modal">
          <p>Are you sure you want to cancel this row?</p>
          <button onClick={() => confirmCancel(true)}>Yes</button>
          <button onClick={() => confirmCancel(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default ReligionFeedbackTable;
