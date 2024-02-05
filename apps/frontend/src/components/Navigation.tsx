import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

//TODO: Need to take in props to check if log in
export function Navigation() {
  const isHomePage = window.location.pathname === "/";
  const loggedIn = () => window.localStorage.getItem("loggedIn") === "true";
  console.log(loggedIn());

  function logOut() {
    window.localStorage.removeItem("loggedIn");
    console.log(loggedIn());
    location.reload();
  }

  return (
    <Navbar className="bg-body-tertiary p-3 justify-content-around">
      <Navbar.Brand>B & W Hospital</Navbar.Brand>
      <Nav className="d-flex justify-content-bewteen">
        <Nav.Link href="/createServiceRequest">Create Service Request</Nav.Link>
        <Nav.Link href="/viewServiceRequest">Service Requests</Nav.Link>
        <Nav.Link href="/importAndExportData">Import & Export Data</Nav.Link>
        <Nav.Link href="/mapData">View Map Data</Nav.Link>
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
      {!loggedIn() ? (
        <Button className="ml-4" href="/login">
          Log In
        </Button>
      ) : (
        <Button className="ml-4" onClick={logOut}>
          Log Out
        </Button>
      )}
    </Navbar>
  );
}
