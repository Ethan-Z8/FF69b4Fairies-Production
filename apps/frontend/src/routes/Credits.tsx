import React from "react";
import { Paper, Typography, Container, Link, Divider } from "@mui/material";

const CreditsPage: React.FC = () => {
  return (
    <Paper
      elevation={24}
      sx={{
        my: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "50%",
        border: "8px solid #012D5A",
        borderRadius: "9px",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Software Credits Page
        </Typography>
        <Typography variant="body1" paragraph textAlign={"center"}>
          This page is to credit and acknowledge all software resources we have
          used to make developing this application possible
        </Typography>
      </Container>
      <Divider sx={{ my: 2 }} />
      <Container
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Software Frameworks
          </Typography>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link href="https://react.dev/" target="_blank">
                React.js & Bootstrap
              </Link>
            </li>
            <li>
              <Link href="https://expressjs.com/" target="_blank">
                Express
              </Link>
            </li>
            <li>
              <Link href="https://aws.amazon.com/" target="_blank">
                AWS
              </Link>
            </li>
          </ul>
        </div>
        <Divider orientation="vertical" sx={{ height: "100%" }} />
        <div style={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Software Libraries
          </Typography>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link href="https://mui.com/" target="_blank">
                Material-UI
              </Link>
            </li>
            <li>
              <Link href="https://reactjs.org/" target="_blank">
                React
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Paper>
  );
};

export default CreditsPage;
