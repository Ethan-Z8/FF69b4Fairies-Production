import React from "react";
import { SoftwareCreditCard } from "../components/SoftwareCreditCard.tsx";
import { Paper, Typography } from "@mui/material";
// Typography, Container, Link
import ReactLogo from "../assets/softwareicons/React-icon.png";
import BootstrapLogo from "../assets/softwareicons/React-Bootstrap-Logo.png";
import MUILogo from "../assets/softwareicons/material-ui-icon.png";
import ExpressIcon from "../assets/softwareicons/expressjs_logo_icon.png";
import NodeJSIcon from "../assets/softwareicons/node-js-icon.png";
import AWSIcon from "../assets/softwareicons/Amazon_Web_Services_Logo.png";
import AxiosIcon from "../assets/softwareicons/axios-icon.png";
import PrismaIcon from "../assets/softwareicons/prisma-icon.png";
import PostgresIcon from "../assets/softwareicons/PostgreSQL-Logo.png";
import DockerIcon from "../assets/softwareicons/docker-icon.png";
import Auth0Icon from "../assets/softwareicons/auth0-icon.png";

const CreditsPage: React.FC = () => {
  return (
    <Paper
      elevation={24}
      sx={{
        my: "1rem",
        mx: "auto",
        display: "flex",
        maxWidth: "50%",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "4rem",
        border: "0.5rem solid #012D5A",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          flexBasis: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3">Credits Page</Typography>
      </div>
      <div
        style={{
          flexBasis: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <h6 style={{ textAlign: "center" }}>
          This page is to acknowledge all frameworks and libraries that make the
          creation of this app possible
        </h6>
      </div>
      <SoftwareCreditCard
        url="https://react.dev/"
        logoUrl={ReactLogo}
        name="React"
        partOfApp="Front End"
      />
      <SoftwareCreditCard
        url="https://react-bootstrap.netlify.app/"
        logoUrl={BootstrapLogo}
        name="React Bootstrap"
        partOfApp="Front End"
      />
      <SoftwareCreditCard
        url="https://mui.com/"
        logoUrl={MUILogo}
        name="Material UI"
        partOfApp="Front End"
      />
      <SoftwareCreditCard
        url="https://expressjs.com/"
        logoUrl={ExpressIcon}
        name="ExpressJS"
        partOfApp="Back End"
      />
      <SoftwareCreditCard
        url="https://nodejs.org/en"
        logoUrl={NodeJSIcon}
        name="NodeJS"
        partOfApp="Back End"
      />
      <SoftwareCreditCard
        url="https://aws.amazon.com/"
        logoUrl={AWSIcon}
        name="AWS (RDS + EC2)"
        partOfApp="Hosting"
      />
      <SoftwareCreditCard
        url="https://axios-http.com/docs/intro"
        logoUrl={AxiosIcon}
        name="Axios"
        partOfApp="Front End"
      />
      <SoftwareCreditCard
        url="https://www.prisma.io/"
        logoUrl={PrismaIcon}
        name="Prisma ORM"
        partOfApp="Back End"
      />
      <SoftwareCreditCard
        url="https://www.postgresql.org/"
        logoUrl={PostgresIcon}
        name="Postgres"
        partOfApp="Database"
      />
      <SoftwareCreditCard
        url="https://www.docker.com/"
        logoUrl={DockerIcon}
        name="Docker"
        partOfApp="Hosting"
      />
      <SoftwareCreditCard
        url="https://auth0.com"
        logoUrl={Auth0Icon}
        name="Auth0"
        partOfApp="Authentication"
      />
    </Paper>
  );
};

export default CreditsPage;
