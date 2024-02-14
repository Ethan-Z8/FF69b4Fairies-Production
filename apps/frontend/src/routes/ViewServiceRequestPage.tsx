import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ServiceRequestRow } from "../components/ServiceRequestRow.tsx";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";

export function ViewServiceRequestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [serviceRequests, setServiceRequests] = useState<
    Array<ServiceRequestType>
  >([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeServiceFilter, setTypeServiceFilter] = useState("");

  useEffect(() => {
    axios
      .get("/api/serviceRequest")
      .then((res) => {
        setServiceRequests(res.data);
        setLoaded(true);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  return (
    loaded && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          gap: 2,
          mt: 2,
        }}
      >
        <Typography variant="h4">Service Requests</Typography>
        <Box sx={{ display: "flex", gap: 2, width: "50%" }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Progress Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              id="status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="InProgress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="typeServiceLabel">Service Type Filter</InputLabel>
            <Select
              value={typeServiceFilter}
              label="Service Type Filter"
              id="type"
              onChange={(e) => setTypeServiceFilter(e.target.value)}
            >
              <MenuItem value=""> Any</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Religious">Religious</MenuItem>
              <MenuItem value="Sanitation">Sanitation</MenuItem>
              <MenuItem value="Flowers">Flowers</MenuItem>
              <MenuItem value="InternalTransportation">
                Internal Transportation
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer
          sx={{ border: 1, borderColor: "#44444444", borderRadius: 2 }}
        >
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
              {serviceRequests
                .filter((req) => {
                  if (statusFilter !== "") {
                    return req.progress === statusFilter;
                  }
                  return true;
                })
                .filter((req) => {
                  if (typeServiceFilter !== "") {
                    return req.typeService === typeServiceFilter;
                  }
                  return true;
                })
                .map((row) => {
                  return <ServiceRequestRow {...row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  );
}
