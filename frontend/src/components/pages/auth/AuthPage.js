import React from "react";
import LoginForm from "../../Forms/LoginForm";

const AuthPage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(#003366, #000044)",
        height: "100vh",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default AuthPage;
