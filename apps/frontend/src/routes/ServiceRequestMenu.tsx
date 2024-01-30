import React, { useEffect } from "react";

import "../style/ServiceRequestLog.css";

import { BackButton } from "../components/BackButton.tsx";

function ServiceRequestMenu() {
  useEffect(() => {
    document.title = "Service Request page";
    console.log(`rendered component`);
  });

  return (
    <div className={"RequestMenu"}>
      <BackButton />
    </div>
  );
}

export { ServiceRequestMenu };
