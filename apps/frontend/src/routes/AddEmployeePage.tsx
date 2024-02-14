import React, { useEffect } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm.tsx";
//import { withAuthenticationRequired } from "@auth0/auth0-react";

function AddEmployeePage() {
  useEffect(() => {
    document.title = "Employee Page";
    console.log(`rendered component`);
  });

  return (
    <div>
      <h1>Create New Employee Login</h1>
      <AddEmployeeForm />
    </div>
  );
}
// const AddEmployeePageWithAuth = withAuthenticationRequired(AddEmployeePage, {
//   onRedirecting: () => <div>Redirecting ....</div>,
// });

export default AddEmployeePage;
