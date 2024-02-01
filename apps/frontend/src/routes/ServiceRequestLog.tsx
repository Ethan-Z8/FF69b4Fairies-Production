import React, { useEffect } from "react";

import "../styling/ServiceRequestLog.css";

import { BackButtonForAdmin } from "../components/BackButtonForAdmin.tsx";

//Stores all service requests entered into the system
function ServiceRequestLog() {
  useEffect(() => {
    document.title = "Service Request page";
    console.log(`rendered component`);
  });

  return (
    <div className={"ServiceTable"}>
      <BackButtonForAdmin />

      <table>
        <tr>
          <th>Name</th>
          <th>ServiceRequest</th>
        </tr>
        <tr>
          <th>Doctor John</th>
          <th>Doctor Rahim</th>
          <th>Doctor Anderson</th>
          <th>Doctor Bob</th>
        </tr>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
        </tr>
      </table>
    </div>
  );
}

export default ServiceRequestLog;
