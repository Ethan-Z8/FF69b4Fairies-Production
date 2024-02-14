import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export function LoginPage() {
  const [loginErr, setLoginErr] = useState<boolean>(false);

  //TODO: Add prop that will change log in button to log out button, just using localstorage for now
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const usernameField = target.querySelector(
      "#username-input",
    )! as HTMLInputElement;
    const passwordField = target.querySelector(
      "#password-input",
    )! as HTMLInputElement;
    if (usernameField.value == "admin" && passwordField.value === "admin") {
      setLoginErr(false);
      window.localStorage.setItem("loggedIn", "true");
      window.location.href = "/";
    } else {
      setLoginErr(true);
    }
  }

  return (
    <Container className="w-50 mt-5">
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              id="username-input"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password-input"
              placeholder="Password"
            />
          </Form.Group>
          <Button type="submit" className="w-25">
            Log In
          </Button>
        </Stack>
      </Form>
      {loginErr && (
        <div className="text-danger">Incorrect username or password</div>
      )}
    </Container>
  );
}
