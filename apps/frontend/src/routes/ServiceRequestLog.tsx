import React from "react";
import ServiceRequestTable from "../components/ServiceRequestTable";

const ServiceRequestLog = () => {
  const columns = ["Doctor Name", "Service Type"]; // Header columns

  return <ServiceRequestTable columns={columns} />;
};

export default ServiceRequestLog;
