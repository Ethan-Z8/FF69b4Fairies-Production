import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { ServiceRequestRow } from "../ServiceRequestRow.tsx";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

interface ServiceRequestInfoModalProps {
  request: ServiceRequestType;
}

export function ServiceRequestInfoModal({
  request,
}: ServiceRequestInfoModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {request.typeService} request for {request.employee}
        <IconButton onClick={() => setModalOpen(true)}>
          <InfoIcon />
        </IconButton>
      </div>
      <Dialog
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle sx={{ display: "flex" }}>
          <p>Service Request # {request.id}</p>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ marginLeft: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell>Type Of Service</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ServiceRequestRow {...request} />
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}
