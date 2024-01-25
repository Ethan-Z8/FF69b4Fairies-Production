import React, { useEffect } from "react";
import "../styling/login.css";
import { LoginText } from "../components/LoginText.tsx";
import { BackButton } from "../components/BackButton.tsx";
import { StaffFields } from "../components/StaffFields.tsx";

function LoginPage() {
  useEffect(() => {
    document.title = "login page";
    console.log(`rendered component`);
  });

  return (
    <div className="loginPage">
      <LoginText />
      <BackButton />
      <StaffFields />
    </div>
  );
}
export default LoginPage;
