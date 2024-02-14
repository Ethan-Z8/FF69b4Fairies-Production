import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Stack from "react-bootstrap/Stack";
// import Table from "react-bootstrap/Table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { ServiceRequestRow } from "../components/ServiceRequestRow.tsx";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";

export function ViewServiceRequestPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [serviceRequests, setServiceRequests] = useState<
    Array<ServiceRequestType>
  >([]);
  const [filter, setFilter] = useState<string>("Any");

  useEffect(() => {
    axios
      .get("/api/serviceRequest")
      .then((res) => {
        setServiceRequests(res.data);
        setLoaded(true);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredServiceRequests = serviceRequests.filter((req) => {
    if (filter === "Any") return true;
    return req.progress === filter;
  });

  return (
    loaded && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          gap: 2,
          mt: 2,
        }}
      >
        <Typography variant="h4">Service Requests</Typography>
        <TableContainer
          sx={{ border: 1, borderColor: "#44444444", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell>Type Of Service</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRequests.map((row) => {
                return <ServiceRequestRow {...row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  );
}
