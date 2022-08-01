import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import { url } from "../store/api";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${url}/token/`, {
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
          console.log(response);
          return response.json();
        } else {
          return response.json().then((data) => {
            setErrorMessage("Invalid credentials");
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(
          data.id,
          data.username,
          data.access.toString(),
          data.refresh
        );
        history.replace("/");
      });
  };

  return (
    <div className="auth-container">
      <h2>Scrum board</h2>
      <div className="content">
        <form onSubmit={handleSubmit} className="input-field">
          <input
            placeholder="Username "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="action">
            <button type="submit">Login</button>
            <div id="error-message">{errorMessage}</div>
            {props.successMessage && <h6 className="success-message">{props.successMessage}</h6>}
            <a onClick={props.showRegisterForm}>Don't have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
