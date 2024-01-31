import React, { useEffect } from "react";

import "../style/ServiceRequestLog.css";

import { BackButton } from "../components/BackButton.tsx";

//Stores all service requests entered into the system
function ServiceRequestLog() {
  useEffect(() => {
    document.title = "Service Request page";
    console.log(`rendered component`);
  });

  return (
    <div className={"ServiceTable"}>
      <BackButton />

      <table>
        <tr>
          <th>Doctor John</th>
          <th>Doctor Rahim</th>
          <th>Doctor Anderson</th>
          <th>Doctor Bob</th>
        </tr>
      </table>
    </div>
  );
}

export default ServiceRequestLog;
