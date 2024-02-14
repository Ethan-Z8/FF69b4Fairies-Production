import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

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
    const displayName = Object.fromEntries(new FormData(target)) as {
      displayName: string;
    };
    handleUserNameChange(displayName.displayName);
  }
  function handleUserNameChange(displayName: string) {
    const updateData = {
      displayName: displayName,
    };
    console.log(updateData);
    axios
      .post("/api/employee/update/displayName", updateData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <Stack gap={3} className="mt-5">
      <h1>Employee's at Brigham and Women's Hospital</h1>
      {loaded && (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              {Object.keys(employeeData[0] || {}).map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Delete Employee</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((req, index) => (
              <tr key={index}>
                <td>{req.username}</td>
                <td>{"Private"}</td>
                <td>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Control
                      key={`${req.displayName}`}
                      defaultValue={req.displayName}
                      type="input"
                      name="displayName"
                    />
                  </Form>
                </td>
                <td key={"delete"}>{"Display Trash Icon"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
}
