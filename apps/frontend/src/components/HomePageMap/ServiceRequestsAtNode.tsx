import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import { CreateRequestAtNodeModal } from "./CreateRequestAtNodeModal.tsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ServiceRequestInfoModal } from "./ServiceRequestInfoModal.tsx";

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
  const [modalOpen, setModalOpen] = useState(false);
  let contents;
  if (nodeID === "") {
    contents = <div>Select a node to see service request at that location</div>;
  } else if (reqsAtLoc.length === 0) {
    contents = <div>No Service Requests at {nodeID}</div>;
  } else {
    contents = reqsAtLoc.map((req) => (
      <ServiceRequestInfoModal request={req} />
    ));
  }

  return (
    <div>
      <Card
        sx={{
          maxHeight: "25%",
          overflow: "hidden",
          overflowY: "auto",
          borderBottomRightRadius: "16px",
          borderBottomLeftRadius: "16px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {nodeID !== "" && (
            <>
              <Button onClick={() => setModalOpen(true)}>
                Create Request Here
              </Button>
              <CreateRequestAtNodeModal
                nodeID={nodeID}
                open={modalOpen}
                setOpen={setModalOpen}
              />
            </>
          )}
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
            <Container>{contents}</Container>
          </Collapse>
        </CardContent>
      </Card>
    </div>
  );
}
