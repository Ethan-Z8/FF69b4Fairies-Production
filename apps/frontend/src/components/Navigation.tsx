import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/image-1.png";
import "../styling/Navigation.css";

export function Navigation() {
  const { loginWithRedirect, logout } = useAuth0();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

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
        <Nav.Link
          style={{ color: "white" }}
          className="ml-4"
          onClick={handleLogout}
        >
          Log Out
        </Nav.Link>
      )}
    </Navbar>
  );
}
