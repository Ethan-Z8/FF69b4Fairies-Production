//Access via "/userProfile" from localhost:3000
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Avatar,
  Typography,
  Container,
  //TableContainer,
} from "@mui/material";
//import { Employee } from "common/src/interfaces/Employee.ts";
//import { ViewServiceRequestPage } from "../routers/ViewServiceRequestPage.tsx";

const Auth0Profile: React.FC = () => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
  /*
import axios from 'axios';

export async function getServiceRequestByEmployee(username: string) {
    try {
        const data = await axios.get("/api/serviceRequest/byEmployee", {username});
        return await data.json();
    } catch (e) {
        console.log((e as Error).message);
        return {error: `failed to get service requests for ${username}`};
    }
}

 */

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Avatar
        alt={user?.name || "User"}
        src={user?.picture}
        sx={{ width: 100, height: 100, margin: "auto" }}
      />
      <Typography variant={"h4"} gutterBottom style={{ marginTop: "25px" }}>
        Hello, {user?.name}
      </Typography>
      <Typography variant={"h4"} gutterBottom style={{ marginTop: "10px" }}>
        Your role is: {user?.role}
      </Typography>
      <Typography
        variant={"h5"}
        fontSize={"15px"}
        color={"gray"}
        gutterBottom
        style={{ marginTop: "100px", marginRight: "250px" }}
      >
        Your assigned service requests...
      </Typography>
      {/*<TableContainer>*/}
      {/*    <ViewServiceRequestPage />*/}
      {/*</TableContainer>*/}

      <Button
        variant="contained"
        onClick={handleLogout}
        style={{ marginTop: "350px" }}
      >
        Sign Out
      </Button>
    </Container>
  );
};

export default Auth0Profile;
