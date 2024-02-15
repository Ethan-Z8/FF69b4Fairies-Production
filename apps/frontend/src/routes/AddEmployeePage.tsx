import React, { useEffect } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm.tsx";
import { Paper } from "@mui/material";
//import { withAuthenticationRequired } from "@auth0/auth0-react";

function AddEmployeePage() {
  useEffect(() => {
    document.title = "Employee Page";
    console.log(`rendered component`);
  });

  return (
    <Paper
      elevation={24}
      sx={{
        my: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        width: "50%",

        gap: "1rem",
        border: "8px solid #012D5A", // Add border styling here
        borderRadius: "8px", // Add border-radius for rounded corners
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <div>
        <h1>Create New Employee Login</h1>
        <AddEmployeeForm />
      </div>
    </Paper>
  );
}
// const AddEmployeePageWithAuth = withAuthenticationRequired(AddEmployeePage, {
//   onRedirecting: () => <div>Redirecting ....</div>,
// });

export default AddEmployeePage;
