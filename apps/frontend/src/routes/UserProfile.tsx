//Access via "/userProfile" from localhost:3000
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Avatar,
  Typography,
  Container,
  TableContainer,
} from "@mui/material";
//import { Employee } from "common/src/interfaces/Employee.ts";
import { ViewServiceRequestPage } from "./ViewServiceRequestPage.tsx";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout();

    window.location.href = "/";
  };

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
      <Typography
        variant={"h5"}
        fontSize={"15px"}
        color={"gray"}
        gutterBottom
        style={{ marginTop: "100px", marginRight: "250px" }}
      >
        Your assigned service requests...
      </Typography>
      <TableContainer>
        <ViewServiceRequestPage />
      </TableContainer>
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

export default UserProfile;
