import React, { useEffect } from "react";
import "../styling/login.css";
import { StaffFields } from "../components/StaffFields.tsx";

function LoginPage() {
  useEffect(() => {
    document.title = "login page";
    console.log(`rendered component`);
  });

  return (
    <div className="loginPage">
      <StaffFields />
    </div>
  );
}
export default LoginPage;
