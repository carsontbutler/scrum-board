import React, { useState } from "react";
import LoginForm from "../../Forms/LoginForm";

const AuthPage = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const showLoginForm = () => {
    setIsLoggingIn(true);
  };
  const showRegisterForm = () => {
    setIsLoggingIn(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(#003366, #000044)",
        height: "100vh",
      }}
    >
      {isLoggingIn ? (
        <LoginForm
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <h6>RegisterForm</h6>
      )}
    </div>
  );
};

export default AuthPage;
