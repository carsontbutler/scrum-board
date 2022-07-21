import React, { useState } from "react";
import LoginForm from "../../Forms/LoginForm";
import RegisterForm from "../../Forms/RegisterForm";

const AuthPage = (props) => {
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
          api={props.api}
          data={props.data}
          setData={props.setData}
          setIsLoading={props.setIsLoading}
          showRegisterForm={showRegisterForm}
        />
      ) : (
        <RegisterForm
          api={props.api}
          data={props.data}
          setData={props.setData}
          setIsLoading={props.setIsLoading}
          showLoginForm={showLoginForm}
        />
      )}
    </div>
  );
};

export default AuthPage;
