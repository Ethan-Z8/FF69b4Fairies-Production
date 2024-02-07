import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

type req = {
  date: string;
  typeService: string;
  reason: string;
  nodeLoc: string;
};

export function ViewServiceRequestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [serviceRequests, setServiceRequests] = useState<Array<req>>([]);

  useEffect(() => {
    axios
      .get("/api/serviceRequest", { baseURL: "http://localhost" })
      .then((res) => {
        console.log("Request Made");
        setServiceRequests(res.data);
        setLoaded(true);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  const handleStatusChange = (index: number, newStatus: string) => {
    console.log(`Change status of request at index ${index} to ${newStatus}`);
  };

  return (
    <Stack gap={3} className="mt-5">
      <Button className="mx-auto w-50" href="/">
        Back To Home Page
      </Button>
      {loaded ? (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              {Object.keys(serviceRequests[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.date.slice(0, 10)}</td>
                <td>{req.typeService}</td>
                <td>{req.reason}</td>
                <td>{req.nodeLoc}</td>
                <td>
                  <Dropdown
                    onSelect={(eventKey) =>
                      eventKey && handleStatusChange(index, eventKey.toString())
                    }
                  >
                    <Dropdown.Toggle
                      variant="success"
                      id={`dropdown-status-${index}`}
                    >
                      Change Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="To-Do">
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="In Progress">
                        In Progress
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Completed">
                        Completed
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Stack>
  );
}
