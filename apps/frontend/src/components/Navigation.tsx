import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.svg";

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
    <Navbar className="bg-body-tertiary p-2 justify-content-around">
      <Navbar.Brand>
        <Nav.Link href="/">
          <img
            src={logo}
            style={{
              minHeight: "4rem",
              margin: 0,
              padding: 0,
            }}
          />
        </Nav.Link>
      </Navbar.Brand>
      <Nav className="d-flex justify-content-bewteen">
        <Nav.Link href="/">Home Page</Nav.Link>
        <Nav.Link href="/createServiceRequest">Create Service Request</Nav.Link>
        <Nav.Link href="/viewServiceRequest">Service Requests</Nav.Link>
        <Nav.Link href="/importAndExportData">Import & Export Data</Nav.Link>
        <Nav.Link href="/mapData">Map Data</Nav.Link>
        {isAuthenticated && (
          <Nav.Link href="/addEmployee">Add Employee</Nav.Link>
        )}
      </Nav>
      {!isAuthenticated && (
        <Nav.Link className="ml-4" onClick={handleLogin}>
          Log In
        </Nav.Link>
      )}
      {isAuthenticated && (
        <Nav.Link className="ml-4" onClick={handleLogout}>
          Log Out
        </Nav.Link>
      )}
    </Navbar>
  );
}
