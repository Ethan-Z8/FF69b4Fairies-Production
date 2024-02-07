import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type req = {
  date: string;
  typeService: string;
  reason: string;
  nodeLoc: string;
  employeeName: string;
  progress: "Assigned" | "InProgress" | "Completed";
};

export function ViewServiceRequestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [serviceRequests, setServiceRequests] = useState<Array<req>>([]);

  useEffect(() => {
    axios
      .get("/api/serviceRequest")
      .then((res) => {
        console.log("Request Made");
        console.log(res.data);
        setServiceRequests(res.data);
        setLoaded(true);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    const target = e.target as HTMLSelectElement;
    const updateData = {
      date: target.id,
      progress: target.value,
    };
    console.log(updateData);
    axios
      .post("/api/serviceRequest/updateProgress", updateData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // console.log(`Change status of request at index ${index} to ${newStatus}`);
  }

  return (
    <Stack gap={3} className="mt-5">
      <Button className="mx-auto w-50" href="/">
        Back To Home Page
      </Button>
      {loaded && (
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
                <td>{req.employeeName}</td>
                <td>
                  <Form.Select
                    defaultValue={req.progress}
                    onChange={handleStatusChange}
                    id={req.date}
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
}
