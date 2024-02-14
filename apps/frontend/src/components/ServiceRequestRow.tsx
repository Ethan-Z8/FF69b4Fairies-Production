import { useState } from "react";
import {
  Box,
  Collapse,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import axios from "axios";

export type ServiceRequestRowProps = ServiceRequestType;
type stringable = { [key: string]: string | boolean };

export function ServiceRequestRow(props: ServiceRequestRowProps) {
  const [open, setOpen] = useState<boolean>(false);

  function handleProgressChange(e: SelectChangeEvent<unknown>) {
    const progress = e.target.value;
    axios
      .post("/api/serviceRequest/updateProgress", {
        progress,
        id: props.id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  }

  function customProperties(request: ServiceRequestType) {
    let uniqueField1, uniqueField2;
    let uniqueData1, uniqueData2;
    switch (request.typeService) {
      case "Sanitation":
        uniqueData1 = (request.sanitationRequest as stringable).messDesc;
        uniqueData2 = (request.sanitationRequest as stringable).hazardous
          ? "Yes"
          : "No";
        uniqueField1 = "Mess Description: ";
        uniqueField2 = "Hazardous: ";
        break;
      case "Religious":
        uniqueData1 = (request.religionRequest as stringable).religionType;
        uniqueData2 = (request.religionRequest as stringable).typeOfService;
        uniqueField1 = "Religion: ";
        uniqueField2 = "Type Of Service: ";
        break;
      case "Flowers":
        uniqueData1 = (request.flowerRequest as stringable).flowerType;
        uniqueData2 = (request.flowerRequest as stringable).recipient;
        uniqueField1 = "Flower Type: ";
        uniqueField2 = "Recipient: ";
        break;
      case "Maintenance":
        uniqueData1 = (request.maintenanceRequest as stringable)
          .personnelNeeded;
        uniqueData2 = (request.maintenanceRequest as stringable).issueType;
        uniqueField1 = "Personnel Needed: ";
        uniqueField2 = "Type Of Issue: ";
        break;
      case "InternalTransportation":
        uniqueData1 = (request.transportationRequest as stringable).endLocation;
        uniqueData2 = (request.transportationRequest as stringable)
          .equipmentNeeded;
        uniqueField1 = "Destination: ";
        uniqueField2 = "Equipment Needed: ";
        break;
      default:
        uniqueData1 = "";
        uniqueData2 = "";
        uniqueField1 = "";
        uniqueField2 = "";
        break;
    }

    return (
      <>
        <Table sx={{ width: "50%" }}>
          <TableBody>
            <TableRow>
              <TableCell>{uniqueField1}</TableCell>
              <TableCell>{uniqueData1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{uniqueField2}</TableCell>
              <TableCell>{uniqueData2}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.date.slice(0, 10)}</TableCell>
        <TableCell>{props.typeService}</TableCell>
        <TableCell>{props.location}</TableCell>
        <TableCell>{props.employee}</TableCell>
        <TableCell>
          <FormControl>
            <Select
              variant="standard"
              label="Progress"
              labelId="progress"
              defaultValue={props.progress}
              name="progress"
              onChange={handleProgressChange}
            >
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>{props.priority}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              {customProperties(props)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
