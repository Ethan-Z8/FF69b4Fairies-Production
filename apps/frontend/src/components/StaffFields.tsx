import "../styling/login.css";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton.tsx";

//this is a basic counter component to show where components should be placed
function CardHeader({
  value,
  suggestion,
}: {
  value: string;
  suggestion: string;
}) {
  return (
    <div className="alignmentHeader">
      <h2 className="boxHeader">{value}</h2>
      <h5 className="suggestionHeader">{suggestion}</h5>
    </div>
  );
}

// CardInput component
function CardInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input className="inputBox" type="text" value={value} onChange={onChange} />
  );
}

// PasswordInput component
function PasswordInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="inputBox password"
      type="password"
      value={value}
      onChange={onChange}
    />
  );
}

export function StaffFields() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if the entered username and password match the expected values
    if (username === "admin" && password === "admin") {
      // Successful login
      setLoginFailure(false);
      setLoginSuccess(true);
      navigate("/adminPage");
    } else {
      // Bad login
      setPassword("");
      setLoginFailure(true);
      setLoginSuccess(false);
      console.log("Username: " + username);
      console.log("Password: " + password);
    }
  };

  // The HTML returned from the component
  return (
    <form className="alignmentDiv" onSubmit={handleSubmit}>
      <CardHeader
        value="Employee ID"
        suggestion="Swipe card for instant access"
      />
      <CardInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CardHeader value="Password" suggestion="" />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton /> {/* temporary until I figure out how to route it */}
      {loginSuccess && <div className="successMessage">Successful login!</div>}
      {loginFailure && (
        <div className="failureMessage">
          Incorrect ID or Password. Try Again
        </div>
      )}
    </form>
  );
}
