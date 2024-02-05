import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

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

  let header;
  if (serviceRequests.length > 0) {
    header = (
      <thead>
        <tr>
          {Object.keys(serviceRequests[0]).map((header) => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
    );
  }

  const body = serviceRequests.map((req) => {
    return (
      <tr key={Date.parse(req.date)}>
        <td>{req.date.slice(0, 10)}</td>
        <td>{req.typeService}</td>
        <td>{req.reason}</td>
        <td>{req.nodeLoc}</td>
      </tr>
    );
  });

  // ViewServiceRequestPage
  return (
    <Stack gap={3} className="mt-5">
      <Button className="mx-auto w-50" href="/">
        Back To Home Page
      </Button>
      {loaded && (
        <Table className="w-75 mx-auto table-striped">
          {header}
          <tbody>{body}</tbody>
        </Table>
      )}
    </Stack>
  );
}
