import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface ServiceRequestsAtNodeProps {
  nodeID: string;
  requests: ServiceRequestType[];
}

export function ServiceRequestsAtNode({
  nodeID,
  requests,
}: ServiceRequestsAtNodeProps) {
  const reqsAtLoc = requests.filter((req) => req.location === nodeID);
  const [open, setOpen] = useState(false);
  let contents;
  if (nodeID === "") {
    contents = <div>Select a node to see service request at that location</div>;
  } else if (reqsAtLoc.length === 0) {
    contents = <div>No Service Requests at {nodeID}</div>;
  } else {
    contents = reqsAtLoc.map((req) => <div>Request ID: {req.id}</div>);
  }

  return (
    <Card
      sx={{
        maxHeight: "70%",
        overflow: "scroll",
      }}
    >
      <CardHeader
        title={"Service Requests"}
        disableTypography
        action={
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
      ></CardHeader>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Container>{contents}</Container>
        </CardContent>
      </Collapse>
    </Card>
  );
}
