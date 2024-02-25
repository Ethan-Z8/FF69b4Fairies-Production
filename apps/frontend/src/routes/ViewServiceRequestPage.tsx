import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ServiceRequestRow } from "../components/ServiceRequestRow.tsx";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import Carousel from "react-bootstrap/Carousel";
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

  interface TypeCounts {
    [key: string]: number;
  }

  const calculateTypeCounts = () => {
    const counts = serviceRequests.reduce((acc: TypeCounts, curr) => {
      const typeService: string = curr.typeService;

      if (curr.typeService == "InternalTransportation") {
        curr.typeService = "Transport";
      }

      acc[typeService] = (acc[typeService] || 0) + 1;
      return acc;
    }, {} as TypeCounts);

    return Object.entries(counts).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
  };

  const calculateEmployeeCounts = () => {
    const counts = serviceRequests.reduce((acc: TypeCounts, curr) => {
      const employee: string = curr.employee || "Unassigned";
      acc[employee] = (acc[employee] || 0) + 1;
      return acc;
    }, {} as TypeCounts);

    return Object.entries(counts).map(([label, value], index) => ({
      id: index,
      value,
      label: employees.find((e) => e.username === label)?.displayName || label, // Display name if found, else username
    }));
  };

  const inProgressCount = serviceRequests.filter(
    (request) => request.progress === "InProgress",
  ).length;
  const completedCount = serviceRequests.filter(
    (request) => request.progress === "Completed",
  ).length;
  const unassignedCount = serviceRequests.filter(
    (request) => request.progress === "Unassigned",
  ).length;
  const assignedCount = serviceRequests.filter(
    (request) => request.progress === "Assigned",
  ).length;

  const resetFilters = () => {
    setStatusFilter("");
    setTypeServiceFilter("");
    setEmployeeFilter("");
  };

  const [index, setIndex] = useState(0);

  //remember that you hit "understand type from usage to make it less sad"
  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

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
            width: "98%",
            border: "8px solid #012D5A",
            borderRadius: "8px",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <div className={"dashboard"}>
            <div className={"dashboardLeft"}>
              <div className={"topRow"}>
                <div className={"rowTopLeft"}>
                  <div className={"text"}>
                    <Typography
                      variant="h6"
                      onClick={() => setStatusFilter("Unassigned")}
                      style={{
                        color: "white",
                        fontSize: "32px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Unassigned<p>{unassignedCount}</p>
                    </Typography>
                  </div>
                </div>
                <div className={"rowTopRight"}>
                  <div className={"text"}>
                    <Typography
                      variant="h6"
                      onClick={() => setStatusFilter("Assigned")}
                      style={{
                        color: "white",
                        fontSize: "32px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Assigned<p>{assignedCount}</p>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={"bottomRow"}>
                <div className={"rowBottomLeft"}>
                  <div className={"text"}>
                    <Typography
                      variant="h6"
                      onClick={() => setStatusFilter("InProgress")}
                      style={{
                        color: "white",
                        fontSize: "32px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                        cursor: "pointer",
                      }}
                    >
                      In Progress<p>{inProgressCount}</p>
                    </Typography>
                  </div>
                </div>
                <div className={"rowBottomRight"}>
                  <div className={"text"}>
                    <Typography
                      variant="h6"
                      onClick={() => setStatusFilter("Completed")}
                      style={{
                        color: "white",
                        fontSize: "32px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Completed<p>{completedCount}</p>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className={"dashboardRight"}>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                variant={"dark"}
              >
                <Carousel.Item>
                  <Stack
                    direction="row"
                    className="h-100 justify-content-center align-items-center"
                    gap={3}
                  >
                    <Stack
                      direction="column"
                      className="justify-content-center align-items-center"
                    >
                      <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Task Assignment Distribution
                      </Typography>
                      <div style={{ flexGrow: 1, minHeight: 0 }}>
                        <PieChart
                          margin={{ top: 0, bottom: 0, left: 10, right: 0 }}
                          series={[
                            {
                              data: calculateEmployeeCounts(),
                              innerRadius: 30,
                              outerRadius: "80%",
                              paddingAngle: 5,
                              cornerRadius: 5,
                            },
                          ]}
                          slotProps={{
                            legend: {
                              direction: "row",
                              position: { vertical: "top", horizontal: "left" },
                              padding: 0,
                              labelStyle: {
                                fontSize: 14,
                              },
                            },
                          }}
                          width={400}
                          height={300}
                        />
                      </div>
                    </Stack>
                    <Stack
                      direction="column"
                      className="justify-content-center align-items-center"
                    >
                      <Typography
                        variant="h5"
                        sx={{ mb: 1, textAlign: "left" }}
                      >
                        Service Type Distribution
                      </Typography>
                      <div style={{ flexGrow: 1, minHeight: 0 }}>
                        <PieChart
                          series={[
                            {
                              data: calculateTypeCounts(),
                              innerRadius: 30,
                              outerRadius: "80%", // Keep outerRadius relative
                              paddingAngle: 5,
                              cornerRadius: 5,
                            },
                          ]}
                          slotProps={{
                            legend: {
                              direction: "column",
                              position: {
                                vertical: "top",
                                horizontal: "right",
                              },
                              padding: 0,
                              labelStyle: {
                                fontSize: 14,
                              },
                            },
                          }}
                          width={400}
                          height={300}
                        />
                      </div>
                    </Stack>
                  </Stack>
                </Carousel.Item>
                <Carousel.Item>
                  <Stack
                    direction="row"
                    className="h-100 justify-content-center align-items-center"
                    gap={3}
                  >
                    <h1>Bar Chart 1</h1>
                    <h1>Bar Chart 2</h1>
                  </Stack>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          <Typography variant="h4">Service Requests</Typography>
          <Box sx={{ display: "flex", gap: 2, width: "65%" }}>
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
            <Button
              variant="outlined"
              onClick={resetFilters}
              style={{ color: "red", borderColor: "red" }}
            >
              Reset Filters <RestartAltIcon />
            </Button>
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
