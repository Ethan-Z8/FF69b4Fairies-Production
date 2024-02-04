import React, { useEffect } from "react";
import { BackButton } from "../components/BackButton.tsx";
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
      <BackButton />
    </div>
  );
}

export default AddEmployeePage;
