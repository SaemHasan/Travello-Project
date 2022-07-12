import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
// import { Link } from 'react-router-dom';
import { Link } from '@mui/material';


export default function LoginBody() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p>&nbsp;&nbsp;</p>
          <div className="side-by-side">
              <p>Don't have an account ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <Link href="/Registration">Register</Link>
          </div>
          <p>&nbsp;&nbsp;</p>

        <Button className="btn_login" block="true"  type="submit" disabled={!validateForm()}>
          Login
        </Button>


      </Form>
      <p>
        email: {email}

      </p>
      <p>

        password: {password}
      </p>
    </div>
  );
}