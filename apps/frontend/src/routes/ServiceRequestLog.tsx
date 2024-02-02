import React from "react";
import ServiceRequestTable from "../components/ServiceRequestTable";

const ServiceRequestLog = () => {
  const columns = ["Type", "Node", "Reason"]; // Header columns

  return <ServiceRequestTable columns={columns} />;
};

export default ServiceRequestLog;
