import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import { Card } from "@mui/material";

export interface ServiceRequestsAtNodeProps {
  nodeID: string;
  requests: ServiceRequestType[];
}

export function ServiceRequestsAtNode({
  nodeID,
  requests,
}: ServiceRequestsAtNodeProps) {
  const reqsAtLoc = requests.filter((req) => req.location === nodeID);

  let contents;
  if (nodeID === "") {
    contents = <div>Select a node to see service request at that location</div>;
  } else if (reqsAtLoc.length === 0) {
    contents = <div>No Service Requests at this node</div>;
  } else {
    contents = reqsAtLoc.map((req) => <div>Request ID: {req.id}</div>);
  }

  return (
    <Card
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        maxHeight: "20%",
        overflow: "scroll",
        padding: "0.75rem",
        textAlign: "center",
      }}
    >
      {contents}
    </Card>
  );
}
