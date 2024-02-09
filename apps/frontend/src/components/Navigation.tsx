import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

//TODO: Need to take in props to check if log in
export function Navigation() {
  const isHomePage = window.location.pathname === "/";
  //const loggedIn = () => window.localStorage.getItem("loggedIn") === "true";

  // function logOut() {
  //   window.localStorage.removeItem("loggedIn");
  //   console.log(loggedIn());
  //   location.reload();
  // }

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
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
    <Navbar className="bg-body-tertiary p-3 justify-content-around">
      <Navbar.Brand>B & W Hospital</Navbar.Brand>
      <Nav className="d-flex justify-content-bewteen">
        <Nav.Link href="/createServiceRequest">Create Service Request</Nav.Link>
        <Nav.Link href="/viewServiceRequest">Service Requests</Nav.Link>
        <Nav.Link href="/importAndExportData">Import & Export Data</Nav.Link>
        <Nav.Link href="/mapData">Map Data</Nav.Link>
        {isAuthenticated && (
          <Nav.Link href="/addEmployee">Add Employee</Nav.Link>
        )}
        {isHomePage && (
          <NavDropdown title="Floors">
            <NavDropdown.Item>Ground</NavDropdown.Item>
            <NavDropdown.Item>LL1</NavDropdown.Item>
            <NavDropdown.Item>LL2</NavDropdown.Item>
            <NavDropdown.Item>L1</NavDropdown.Item>
            <NavDropdown.Item>L2</NavDropdown.Item>
            <NavDropdown.Item>L3</NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
      {!isAuthenticated && (
        <Button className="ml-4" onClick={handleLogin}>
          Log In
        </Button>
      )}
      {isAuthenticated && (
        <Button className="ml-4" onClick={handleLogout}>
          Log Out
        </Button>
      )}
    </Navbar>
  );
}
