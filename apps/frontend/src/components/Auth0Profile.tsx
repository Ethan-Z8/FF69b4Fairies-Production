//Access via "/userProfile" from localhost:3000\
import React, { useEffect, useState } from "react";
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
  //TableContainer,
} from "@mui/material";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import axios from "axios";
import { ServiceRequestRow } from "./ServiceRequestRow.tsx";
//import { Employee } from "common/src/interfaces/Employee.ts";
//import { ViewServiceRequestPage } from "../routers/ViewServiceRequestPage.tsx";

const Auth0Profile = () => {
  const { user, logout } = useAuth0();
  // console.log(user);

  const [employeeData, setEmployeeData] = useState<Array<ServiceRequestType>>(
    [],
  );

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleImportData = async () => {
    try {
      // Import map data
      await axios.post("/api/map/import", {
        username: user?.nickname,
      });

      // Import edge nodes
      await axios.post("/api/edgeNodes/import", {
        username: user?.nickname,
      });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error has occurred";
      console.error(errorMessage);
      // Handle import error
    }
  };

  const handleExportData = () => {
    axios
      .get("/api/serviceRequest/exportAll", {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all_service_requests.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

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
                <TableCell> Date</TableCell>
                <TableCell> Type of Service</TableCell>
                <TableCell> Location</TableCell>
                <TableCell> Progress</TableCell>
                <TableCell> Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((req) => {
                return <ServiceRequestRow {...req} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleImportData}
            sx={{ mr: 2, marginTop: "25px" }}
          >
            Import All Data
          </Button>

          <Button
            variant="contained"
            onClick={handleExportData}
            sx={{ mr: 2, marginTop: "25px" }}
          >
            Export All Data
          </Button>
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
