import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
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
import "../styling/viewRequestPage.css";

export function ViewServiceRequestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [serviceRequests, setServiceRequests] = useState<
    Array<ServiceRequestType>
  >([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeServiceFilter, setTypeServiceFilter] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [employees, setEmployees] = useState<
    Array<{ username: string; displayName: string }>
  >([]);

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

    axios
      .get("/api/employee")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  return (
    loaded && (
      <div className={"topContainer"}>
        <Paper
          elevation={24}
          sx={{
            my: 8,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "90%",
            border: "8px solid #012D5A",
            borderRadius: "8px",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <div className={"dashboard"}>
            <div className={"dashboardLeft"}>
              <div className={"topRow"}>
                <div className={"text"}>
                  <h3>Unassigned</h3>
                </div>
                <div className={"text"}>
                  <h3>Assigned</h3>
                </div>
              </div>
              <div className={"bottomRow"}>
                <div className={"rowLeft"}>
                  <div className={"text"}>
                    <h3>In Progress</h3>
                  </div>
                </div>
                <div className={"rowRight"}>
                  <div className={"text"}>
                    <h3>Completed</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={"dashboardRight"}>
              <h2>Service Request Chart</h2>
            </div>
          </div>
          <Typography variant="h4">Service Requests</Typography>
          <Box sx={{ display: "flex", gap: 2, width: "53%" }}>
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
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Employee Filter</InputLabel>
              <Select
                value={employeeFilter}
                label="Employee Filter"
                id="employee"
                onChange={(e) => setEmployeeFilter(e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee.username} value={employee.username}>
                    {employee.displayName}
                  </MenuItem>
                ))}
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
                  .filter((req) => {
                    if (employeeFilter !== "") {
                      return req.employee === employeeFilter;
                    }
                    return true;
                  })
                  .map((row) => {
                    return <ServiceRequestRow {...row} />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    )
  );
}
