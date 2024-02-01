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
          <th>Clean-up</th>
        </tr>
        <tr>
          <th>Doctor Rahim</th>
          <th>Clean-up</th>
        </tr>
      </table>
    </div>
  );
}

export default ServiceRequestLog;
