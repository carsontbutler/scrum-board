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
    <div className="bg-white p-5 max-w-md mx-auto rounded shadow-sm h-80 text-center">
      <h2 className="text-2xl px-4 text-blue-800">Scrum board</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          className="w-full border rounded h-12 px-4 focus:outline-none"
          placeholder="Username "
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="flex items-center">
          <input
            className="w-full border rounded h-12 px-4 focus:outline-none -mr-7"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center text-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
