import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const url = "http://localhost:8000/api/token/";

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            setErrorMessage("Invalid credentials");
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.id, data.username, data.access, data.refresh);
        history.replace("/");
      });
  };

  return (
    <Container className="login_container">
      <div className="Login">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="text-center">
            <Button
              block
              size="lg"
              type="submit"
              className="form-button"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
