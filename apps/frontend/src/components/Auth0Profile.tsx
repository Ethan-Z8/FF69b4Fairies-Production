//Access via "/userProfile" from localhost:3000\
import React, { useEffect, useState, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Avatar,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Stack,
  //TableContainer,
} from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import { ServiceRequestRow } from "./ServiceRequestRow.tsx";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
//import { Employee } from "common/src/interfaces/Employee.ts";
//import { ViewServiceRequestPage } from "../routers/ViewServiceRequestPage.tsx";

const Auth0Profile = () => {
  const [importErr] = useState<boolean>(false);
  const [exportErr, setExportErr] = useState<boolean>(false);

  const { user, logout } = useAuth0();
  // console.log(user);

  const [employeeData, setEmployeeData] = useState<Array<ServiceRequestType>>(
    [],
  );

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  async function handleImport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExportErr(false); // Reset the import error state

    const target = e.target as HTMLFormElement;
    const edgesInput = target.querySelector("#edgesInput") as HTMLInputElement;
    const nodesInput = target.querySelector("#nodesInput") as HTMLInputElement;
    const employeesInput = target.querySelector(
      "#employeesInput",
    ) as HTMLInputElement;

    const mapData = new FormData();
    const employeeData = new FormData();

    if (edgesInput.files) {
      mapData.append("edges", edgesInput.files[0]);
    }

    if (nodesInput.files) {
      mapData.append("nodes", nodesInput.files[0]);
    }

    if (employeesInput.files) {
      employeeData.append("employee", employeesInput.files[0]);
    }

    axios
      .post("/api/map/import", mapData, {
        headers: {
          "Content-Type": "multipart/form",
        },
      })
      .then((res) => {
        console.log("Map import response:", res);
      })
      .catch((error: Error) => {
        console.error("Map import error:", error.message);
        setExportErr(true);
      });

    axios
      .post("/api/employee/import", employeeData, {
        headers: {
          "Content-Type": "multipart/form",
        },
      })
      .then((res) => {
        console.log("Employee import response:", res);
      })
      .catch((error: Error) => {
        console.error("Employee import error:", error.message);
        setExportErr(true);
      });
  }

  async function handleExport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const mapExport: AxiosResponse = await axios.get("/api/map/export", {
        responseType: "blob",
      });

      if (mapExport.headers["content-type"] !== "application/zip") {
        throw new Error("Did not receive valid map data");
      }

      const mapUrl: string = window.URL.createObjectURL(
        new Blob([mapExport.data]),
      );
      const mapLink: HTMLAnchorElement = document.createElement("a");
      mapLink.href = mapUrl;
      mapLink.setAttribute("download", "map_data.zip");
      document.body.appendChild(mapLink);
      mapLink.click();
      document.body.removeChild(mapLink);

      const employeeExport: AxiosResponse = await axios.get(
        "/api/employee/export",
        {
          responseType: "blob",
        },
      );

      if (employeeExport.headers["content-type"] !== "application/zip") {
        throw new Error("Did not receive valid employee data");
      }

      const employeeUrl: string = window.URL.createObjectURL(
        new Blob([employeeExport.data]),
      );
      const employeeLink: HTMLAnchorElement = document.createElement("a");
      employeeLink.href = employeeUrl;
      employeeLink.setAttribute("download", "employee_data.zip");
      document.body.appendChild(employeeLink);
      employeeLink.click();
      document.body.removeChild(employeeLink);

      setExportErr(false);
    } catch (error) {
      console.log((error as Error).message);
      setExportErr(true);
    }
  }

  useEffect(() => {
    const fetchEmployeeData = () => {
      axios
        .get("/api/serviceRequest/byEmployee", {
          params: { username: user?.nickname },
        })
        .then((res) => {
          console.log("Employee Requests Fetched");
          setEmployeeData(res.data);
        })
        .catch((e: Error) => {
          console.log(e.message);
        });
    };

    fetchEmployeeData();
  }, [user?.nickname]);

  useEffect(() => {
    axios
      .get("/api/serviceRequest/byEmployee", {
        params: { username: user?.nickname },
      })
      .then((res) => {
        console.log("Employee Requests Fetched");
        setEmployeeData(res.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, [user?.nickname]);

  return (
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
      <Container style={{ textAlign: "center", marginTop: "50px" }}>
        <Avatar
          alt={user?.name || "User"}
          src={user?.picture}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant={"h4"} gutterBottom style={{ marginTop: "25px" }}>
          Hello, {user?.nickname}
        </Typography>
        <Typography
          variant={"h6"}
          gutterBottom
          style={{ marginTop: "25px", marginBottom: "10px" }}
        >
          Email: {user?.name}
        </Typography>
        <Typography
          variant={"h5"}
          fontSize={"15px"}
          color={"gray"}
          gutterBottom
          style={{ marginTop: "10px", textAlign: "left" }}
        >
          Your assigned service requests...
        </Typography>
        <TableContainer
          sx={{
            border: 1,
            borderColor: "#44444444",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell> Date</TableCell>
                <TableCell> Type of Service</TableCell>
                <TableCell> Location</TableCell>
                <TableCell> Employee</TableCell>
                <TableCell> Progress</TableCell>
                <TableCell> Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData
                .filter((req) => {
                  return user?.nickname === req.employee;
                })
                .map((req) => {
                  return <ServiceRequestRow {...req} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Form className="m-auto w-75 mt-5" onSubmit={handleImport}>
            <Form.Group
              as={Row}
              className="mb-3"
              style={{
                width: "77.3x%",
                display: "inline-flex",
                paddingTop: "5%",
              }}
              onSubmit={handleImport}
            >
              <Col sm={12}>
                <h4>Import All Data as CSV</h4>
              </Col>

              <Form.Label column sm={2} className="mb-3">
                Edges CSV
              </Form.Label>
              <Col sm={10} className="mb-3">
                <Form.Control type="file" id="edgesInput" accept=".csv" />
              </Col>

              <Form.Label column sm={2} className="mb-3">
                Nodes CSV
              </Form.Label>
              <Col sm={10} className="mb-3">
                <Form.Control type="file" id="nodesInput" accept=".csv" />
              </Col>

              <Form.Label column sm={2} className="mb-3">
                Employee CSV
              </Form.Label>
              <Col sm={10} className="mb-3">
                <Form.Control type="file" id="employeesInput" accept=".csv" />
              </Col>

              <Col sm={12} className="mb-3">
                <Button
                  type="submit"
                  className="mt-3 w-100"
                  variant="outlined"
                  endIcon={<FileUploadOutlinedIcon />}
                >
                  Import
                </Button>
                <Form.Text
                  className="text-danger"
                  style={{ visibility: importErr ? "visible" : "hidden" }}
                >
                  Error Importing Data
                </Form.Text>
              </Col>
            </Form.Group>
          </Form>

          <Form className="m-auto w-75 mt-5" onSubmit={handleExport}>
            <Form.Group controlId="exportCsv" as={Stack}>
              <h4>Export All Data as CSV</h4>
              <Button
                type="submit"
                variant="outlined"
                endIcon={<FileDownloadIcon />}
              >
                {" "}
                Download All Data{" "}
              </Button>
            </Form.Group>
            <Form.Text
              className="text-danger"
              style={{ visibility: exportErr ? "visible" : "hidden" }}
            >
              Error Exporting Data
            </Form.Text>
          </Form>
        </Box>

        <Button
          variant="contained"
          onClick={handleLogout}
          style={{ marginTop: "150px" }}
        >
          Sign Out
        </Button>
      </Container>
    </Paper>
  );
};

export default Auth0Profile;
