import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Stack from "react-bootstrap/Stack";
// import Table from "react-bootstrap/Table";
import {
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
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
        console.log("Request Made");
        console.log(res.data);
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

  // return (
  //   <Stack gap={3} className="mt-5">
  //     <Form.Select
  //       aria-label="Filter by service status"
  //       onChange={handleFilterChange}
  //       className="w-25 mx-auto"
  //     >
  //       <option value="Any">Any</option>
  //       <option value="Assigned">Assigned</option>
  //       <option value="InProgress">In Progress</option>
  //       <option value="Completed">Completed</option>
  //     </Form.Select>
  //     {loaded && (
  //       <Table responsive striped bordered hover>
  //         <thead>
  //           <tr>
  //             {Object.keys(serviceRequests[0] || {}).map((header) => (
  //               <th key={header}>{header}</th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filteredServiceRequests.map((req, index) => (
  //             <tr key={index}>
  //               <td>{req.date.slice(0, 10)}</td>
  //               <td>{req.typeService}</td>
  //               <td>{req.reason}</td>
  //               <td>{req.nodeLoc}</td>
  //               <td>{req.employeeName}</td>
  //               <td>
  //                 <Form.Select
  //                   key={`${req.date}-${req.progress}`} // Unique key based on date and progress
  //                   defaultValue={req.progress}
  //                   onChange={handleStatusChange}
  //                   id={req.date}
  //                 >
  //                   <option value="Assigned">Assigned</option>
  //                   <option value="InProgress">In Progress</option>
  //                   <option value="Completed">Completed</option>
  //                 </Form.Select>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </Table>
  //     )}
  //   </Stack>
  // );

  return (
    loaded && (
      <TableContainer>
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
    )
  );
}
