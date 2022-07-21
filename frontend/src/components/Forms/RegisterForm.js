import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import { axiosInstance, url } from "../store/api";

const RegisterForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${url}/register/`, {
        username: username,
        password: password,
        password2: password2,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          props.showLoginForm();
        } 
      });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

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
          <input
            placeholder="Confirm password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <div className="action">
            <button type="submit">Register</button>
            <div id="error-message">{errorMessage}</div>
            <a onClick={props.showLoginForm}>
              Already have an account? Sign in.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
