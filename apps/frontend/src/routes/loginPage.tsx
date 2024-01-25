import React, { useEffect } from "react";
import { LoginText } from "../components/LoginText.tsx";

function LoginPage() {
  useEffect(() => {
    document.title = "login page";
    console.log(`rendered component`);
  });
  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <LoginText />
    </div>
  );
}
export default LoginPage;
