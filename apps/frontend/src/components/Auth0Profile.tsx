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

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const [employeeData, setEmployeeData] = useState<Array<ServiceRequestType>>(
    [],
  );
  useEffect(() => {
    axios
      .get("/api/serviceRequest/byEmployee", {
        params: { username: user?.nickname },
      })
      .then((res) => {
        console.log("Request Made");
        console.log(res.data);
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
      <Container
        //maxWidth="2sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
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
        {/*  THIS STUFF NEEDS TO BE PUT IN LATER*/}
        {/*<Typography variant={"h4"} gutterBottom style={{ marginTop: "10px" }}>*/}
        {/*  Your role is: {user?.role}*/}
        {/*</Typography>*/}
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

        {/*<TableContainer>*/}
        {/*    <ViewServiceRequestPage />*/}
        {/*</TableContainer>*/}

        <Button
          variant="contained"
          onClick={handleLogout}
          style={{ marginTop: "200px" }}
        >
          Sign Out
        </Button>
      </Container>
    </Paper>
  );
};

export default Auth0Profile;
