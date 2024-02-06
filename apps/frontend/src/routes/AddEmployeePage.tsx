import React, { useEffect } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm.tsx";

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

export default AddEmployeePage;
