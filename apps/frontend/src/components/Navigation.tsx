import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
// import MuiAppBar from "@mui/material/AppBar";
// import MuiToolbar from "@mui/material/Toolbar";
// import MuiButton from "@mui/material/Button";
// import MuiTypography from "@mui/material/Typography";
// import MuiLink from "@mui/material/Link";
// import MuiGrid from "@mui/material/Grid";
//import IconButton from "@mui/material";
import "../styling/Navigation.css";

import logo from "../assets/image-1.png";
//import MuiMenu from "@mui/material/Menu";
//import MuiMenuItem from "@mui/material/MenuItem";
// import { Link } from "react-router-dom";
import {
  Avatar,
  Popover,
  // MenuItem,
  // Paper,
  ClickAwayListener,
  Chip,
  Container,
  SvgIcon,
  Typography,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

// interface NavLink {
//   label: string;
//   href: string;
//   sublinks?: NavLink[];
// }

export function Navigation() {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profileMenuAnchor, setProfileMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  // const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //const [serviceRequestsMenuOpen, setServiceRequestsMenuOpen] =
  React.useState(false);
  // const [mapDataMenuOpen, setMapDataMenuOpen] = React.useState(false);
  // const [employeeDataMenuOpen, setEmployeeDataMenuOpen] = React.useState(false);
  const { user, logout } = useAuth0();

  useEffect(() => {
    const fun = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        await loginWithRedirect({
          appState: {
            returnTo: location.pathname,
          },
        });
      }
    };
    if (!isLoading && isAuthenticated) {
      fun();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    });
  };

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <Navbar
      style={{ backgroundColor: "#012D5A" }}
      className="p-2 justify-content-around"
    >
      <Navbar.Brand>
        <Nav.Link href="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              maxHeight: "4rem",
              margin: 0,
              padding: 0,
            }}
          />
        </Nav.Link>
      </Navbar.Brand>
      <Nav className="d-flex justify-content-around w-50">
        <Nav.Link style={{ color: "white" }} href="/">
          Home Page
        </Nav.Link>
        <NavDropdown
          title={<span style={{ color: "white" }}>Service Requests </span>}
          className="navbar-item"
          id={"fa"}
        >
          <NavDropdown.Item href="/createServiceRequest">
            Create Service Request
          </NavDropdown.Item>
          <NavDropdown.Item href="/viewServiceRequest">
            View Service Requests
          </NavDropdown.Item>
        </NavDropdown>

        {isAuthenticated && (
          <>
            <NavDropdown
              title={<span style={{ color: "white" }}>Map Data</span>}
            >
              <Nav.Link href="/importAndExportData">
                Import & Export Data
              </Nav.Link>
              <Nav.Link href="/mapData">View Map Data</Nav.Link>
            </NavDropdown>
            <NavDropdown
              title={<span style={{ color: "white" }}>Employee Data</span>}
            >
              <Nav.Link href="/addEmployee">Add Employee</Nav.Link>
              <Nav.Link href="/viewEmployeeData">View Employees</Nav.Link>
            </NavDropdown>
            <NavDropdown
              title={<span style={{ color: "white" }}>Information </span>}
              className="navbar-item"
            >
              <NavDropdown.Item href="/AboutUs">About Us</NavDropdown.Item>
              <NavDropdown.Item href="/Credits">
                Credited Software
              </NavDropdown.Item>
            </NavDropdown>
          </>
        )}
      </Nav>
      {!isAuthenticated && (
        <Nav.Link
          style={{ color: "white" }}
          className="ml-4"
          onClick={handleLogin}
        >
          Log In
        </Nav.Link>
      )}
      {isAuthenticated && (
        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
          style={{ fontSize: "0.9rem" }}
        >
          <Avatar
            alt={user?.name || "User"}
            src={user?.picture}
            sx={{ width: 50, height: 50 }}
          />

          <Popover
            id="profile-menu"
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <ClickAwayListener onClickAway={handleProfileMenuClose}>
              <Container className="profileContainer">
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  <SvgIcon component={LogoutIcon} />
                </IconButton>
                <Avatar
                  alt={user?.name || "User"}
                  src={user?.picture}
                  sx={{
                    position: "center",
                    top: 15,
                    left: -4,
                    width: 50,
                    height: 50,
                    margin: "auto",
                  }}
                />
                <Typography
                  variant={"h6"}
                  mt={3}
                  // mb={1}
                  textAlign={"center"}
                  // style={{ marginTop: "10px" }}
                >
                  Hello,
                </Typography>
                <Typography
                  variant={"h6"}
                  gutterBottom
                  // mt={1}
                  mb={2}
                  textAlign={"center"}
                  // style={{ marginTop: "10px" }}
                >
                  {user?.name}
                </Typography>

                {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
                <div className={"chipContainer"}>
                  <Chip
                    label="Manage your account"
                    component="a"
                    href="/Auth0Profile"
                    variant="outlined"
                    clickable
                  />
                </div>
              </Container>
            </ClickAwayListener>
          </Popover>
        </IconButton>
      )}
    </Navbar>
  );
}
