import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import MuiGrid from "@mui/material/Grid";
//import IconButton from "@mui/material";
import "../styling/Navigation.css";

import logo from "../assets/image-1.png";
//import MuiMenu from "@mui/material/Menu";
//import MuiMenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import {
  Avatar,
  Popover,
  MenuItem,
  Paper,
  ClickAwayListener,
  Chip,
  Container,
  SvgIcon,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavLink {
  label: string;
  href: string;
  sublinks?: NavLink[];
}

export function Navigation() {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const handleMenuOpen = (
    label: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setActiveMenu(label);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
    setAnchorEl(null);
  };
  /*
      const handleClick = () => {

      }
    */
  const navLinks: NavLink[] = [
    { label: "Home Page", href: "/" },
    {
      label: "Service Requests",
      href: "/createServiceRequest",
      sublinks: [
        { label: "Create Service Request", href: "/createServiceRequest" },
        { label: "View Service Requests", href: "/viewServiceRequest" },
      ],
    },
    {
      label: "Map Data",
      href: "/importAndExportData",
      sublinks: [
        { label: "Import & Export Data", href: "/importAndExportData" },
        { label: "View Map Data", href: "/mapData" },
      ],
    },
    {
      label: "Employee Data",
      href: "/addEmployee",
      sublinks: [
        { label: "Add Employee", href: "/addEmployee" },
        { label: "View Employees", href: "/viewEmployeeData" },
      ],
    },
  ];

  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  /*
    const handleServiceRequestsMenuOpen = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      setServiceRequestsMenuOpen(!serviceRequestsMenuOpen);
      setMapDataMenuOpen(false);
      setEmployeeDataMenuOpen(false);
      setAnchorEl(event.currentTarget);
    };

    const handleMapDataMenuOpen = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      setMapDataMenuOpen(!mapDataMenuOpen);
      setServiceRequestsMenuOpen(false);
      setEmployeeDataMenuOpen(false);
      setAnchorEl(event.currentTarget);
    };

    const handleEmployeeDataMenuOpen = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      setEmployeeDataMenuOpen(!employeeDataMenuOpen);
      setServiceRequestsMenuOpen(false);
      setMapDataMenuOpen(false);
      setAnchorEl(event.currentTarget);
    };
  */

  const [profileMenuAnchor, setProfileMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const renderNavLink = (link: NavLink) => (
    <React.Fragment key={link.label}>
      {link.sublinks ? (
        <MuiButton
          color="inherit"
          onClick={(e) => {
            if (activeMenu === link.label) {
              handleMenuClose();
            } else {
              handleMenuOpen(link.label, e);
            }
          }}
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          sx={{ marginRight: 5, display: "flex", alignItems: "center" }}
        >
          {link.label === "Home Page" && <HomeIcon sx={{ marginRight: 1 }} />}
          {link.label === "Service Requests" && (
            <RoomServiceIcon sx={{ marginRight: 1 }} />
          )}
          {link.label === "Map Data" && <MapIcon sx={{ marginRight: 1 }} />}
          {link.label === "Employee Data" && (
            <PersonIcon sx={{ marginRight: 1 }} />
          )}
          <span>{link.label}</span>
        </MuiButton>
      ) : (
        <MuiButton
          color="inherit"
          component={Link}
          to={link.href}
          style={{ fontSize: "0.9rem", marginRight: "2rem" }}
        >
          {link.label}
        </MuiButton>
      )}
      {link.sublinks && (
        <Popover
          id="dropdown-menu"
          anchorEl={anchorEl}
          keepMounted
          open={activeMenu === link.label}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <ClickAwayListener onClickAway={handleMenuClose}>
            <Paper>
              {link.sublinks.map((sublink) => (
                <MenuItem
                  key={sublink.label}
                  onClick={() => {
                    handleMenuClose();
                  }}
                  component={Link}
                  to={sublink.href}
                >
                  {sublink.label}
                </MenuItem>
              ))}
            </Paper>
          </ClickAwayListener>
        </Popover>
      )}
    </React.Fragment>
  );

  return (
    <MuiAppBar position="static" style={{ backgroundColor: "#012D5A" }}>
      <MuiToolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <MuiTypography variant="h6">
          <MuiLink href="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                maxHeight: "4rem",
                margin: 0,
                padding: 0,
              }}
            />
          </MuiLink>
        </MuiTypography>
        <MuiGrid container spacing={2} justifyContent="center">
          {navLinks.map(renderNavLink)}
        </MuiGrid>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {!isAuthenticated && (
            <MuiButton color="inherit" onClick={handleLogin}>
              Login
            </MuiButton>
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
                    <button onClick={handleLogout}>
                      <SvgIcon component={LogoutIcon} />
                    </button>
                    <Avatar
                      alt={user?.name || "User"}
                      src={user?.picture}
                      sx={{ width: 50, height: 50, margin: "auto" }}
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
        </div>
      </MuiToolbar>
    </MuiAppBar>
  );
}
