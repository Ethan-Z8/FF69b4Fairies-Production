import React from "react";
import ServiceRequestTable from "../components/ServiceRequestTable";
import { BackButton } from "../components/BackButton.tsx";

const ServiceRequestLog = () => {
  const columns = ["Date", "Type", "Node", "Reason", "Employee", "Status"]; // Header columns

  return (
    <>
      <BackButton />
      <ServiceRequestTable columns={columns} />
    </>
  );
};

export default ServiceRequestLog;
