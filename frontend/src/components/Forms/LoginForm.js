import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import {axiosInstance, url} from "../store/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${url}/token/`, {
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
    <div className="auth-container p-5 rounded">
      <h2 className="px-4">Scrum board</h2>
      <form onSubmit={handleSubmit} className="mt-4 text-center">
        <input
          className="rounded m-2"
          placeholder="Username "
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="text-center">
          <input
            className="rounded m-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center mt-2">
          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded"
            style={{backgroundColor: "#4E93E4", borderColor: ""}}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
