import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  Typography,
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
} from "@mui/material";

type req = {
  username: string;
  displayName: string;
};

export function EmployeeData() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<Array<req>>([]);

  useEffect(() => {
    axios
      .get("/api/employee")
      .then((res) => {
        console.log("Request Made");
        console.log(res.data);
        setEmployeeData(res.data);
        setLoaded(true);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }, []);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const displayName = String(target.displayName.value);
    const username = String(target.username.value);
    const displayNameChange = { displayName, username };

    axios
      .post("/api/employee/update/displayName", displayNameChange)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleDeleteEmployee(username: string) {
    axios
      .delete("/api/employee/delete", { data: { username } })
      .then(() => location.reload())
      .catch((err) => console.log(err));
  }

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
        <Typography variant="h4">Employee Data</Typography>
        <TableContainer
          sx={{ border: 1, borderColor: "#44444444", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Username</TableCell>
                <TableCell> Password</TableCell>
                <TableCell> Display Name</TableCell>
                <TableCell> Delete?</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employeeData.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.username}</TableCell>
                  <TableCell>{"•••••••••••"}</TableCell>
                  <TableCell>
                    <Form
                      onSubmit={handleFormSubmit}
                      style={{ display: "flex" }}
                    >
                      <Form.Control
                        key={`${req.displayName}`}
                        defaultValue={req.displayName}
                        type="input"
                        name="displayName"
                        style={{ width: "90%" }}
                      />
                      <input
                        defaultValue={req.username}
                        name="username"
                        style={{ display: "none" }}
                      />
                      <Button
                        type={"submit"}
                        variant={"btn btn-outline-danger"}
                        style={{ marginLeft: "5%", marginRight: "5%" }}
                      >
                        {" "}
                        Change{" "}
                      </Button>
                    </Form>
                  </TableCell>
                  <TableCell key={"delete"}>
                    <Button
                      onClick={() => handleDeleteEmployee(req.username)}
                      variant={"danger"}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  );
}
