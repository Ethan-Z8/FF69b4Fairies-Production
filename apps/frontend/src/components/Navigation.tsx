import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export function Navigation() {
  const isHomePage = window.location.pathname === "/";
  const loggedIn = () => window.localStorage.getItem("loggedIn") === "true";

  function logOut() {
    window.localStorage.removeItem("loggedIn");
    console.log(loggedIn());
    location.reload();
  }

  return (
    <Navbar className="bg-body-tertiary p-3 justify-content-around">
      <Navbar.Brand>B & W Hospital</Navbar.Brand>
      <Nav className="d-flex justify-content-bewteen">
        {!isHomePage && <Nav.Link href="/">Home Page</Nav.Link>}
        <Nav.Link href="/createServiceRequest">Create Service Request</Nav.Link>
        <Nav.Link href="/viewServiceRequest">Service Requests</Nav.Link>
        <Nav.Link href="/importAndExportData">Import & Export Data</Nav.Link>
        <Nav.Link href="/mapData">Map Data</Nav.Link>
        {loggedIn() && <Nav.Link href="/addEmployee">Add Employee</Nav.Link>}
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
