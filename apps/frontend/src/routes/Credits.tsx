import React from "react";
import { Paper, Typography, Container, Link, Divider } from "@mui/material";
import ReactLogo from "../assets/softwareicons/React-icon.png";
import BootstrapLogo from "../assets/softwareicons/React-Bootstrap-Logo.png";
import MUILogo from "../assets/softwareicons/material-ui-icon.png";
import NodeJSIcon from "../assets/softwareicons/node-js-icon.png";
import AWSIcon from "../assets/softwareicons/Amazon_Web_Services_Logo.png";

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
                <img
                  src={ReactLogo}
                  alt="Logo"
                  style={{
                    maxHeight: "6rem",
                    margin: 0,
                    padding: "0.5rem",
                  }}
                />
                <p style={{ marginTop: "0.5rem" }}>React.js & Bootstrap</p>
              </Link>
            </li>
            <li>
              <Link href="https://expressjs.com/" target="_blank">
                <img
                  src={NodeJSIcon}
                  alt="Logo"
                  style={{
                    maxHeight: "6rem",
                    margin: 0,
                    padding: "0.5rem",
                  }}
                />
                <p style={{ marginTop: "0.5rem" }}>Express</p>
              </Link>
            </li>
            <li>
              <Link href="https://aws.amazon.com/" target="_blank">
                <img
                  src={AWSIcon}
                  alt="Logo"
                  style={{
                    maxHeight: "5rem",
                    margin: 0,
                    padding: "0.5rem",
                  }}
                />
                <p style={{ marginTop: "0.5rem" }}>AWS</p>
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
                <img
                  src={MUILogo}
                  alt="Logo"
                  style={{
                    maxHeight: "5rem",
                    margin: 0,
                    padding: "0.5rem",
                  }}
                />
                <p style={{ marginTop: "0.5rem" }}>Material-UI</p>
              </Link>
            </li>
            <li>
              <Link href="https://react-bootstrap.netlify.app/" target="_blank">
                <img
                  src={BootstrapLogo}
                  alt="Logo"
                  style={{
                    maxHeight: "7rem",
                    margin: 0,
                    padding: "0.5rem",
                  }}
                />
                <p style={{ marginTop: "0.5rem" }}>React Bootstrap</p>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Paper>
  );
};

export default CreditsPage;
