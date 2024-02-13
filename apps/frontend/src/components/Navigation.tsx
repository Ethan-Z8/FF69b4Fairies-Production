import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.svg";

export function Navigation() {
  const loggedIn = () => window.localStorage.getItem("loggedIn") === "true";

  function logOut() {
    window.localStorage.removeItem("loggedIn");
    console.log(loggedIn());
    location.reload();
  }

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
        {loggedIn() && <Nav.Link href="/addEmployee">Add Employee</Nav.Link>}
      </Nav>
      {!loggedIn() ? (
        <Nav.Link className="ml-4" href="/login">
          Log In
        </Nav.Link>
      ) : (
        <Button className="ml-4" onClick={logOut}>
          Log Out
        </Button>
      )}
    </Navbar>
  );
}
