import React from "react";
import LoginForm from "../../Forms/LoginForm";

const AuthPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ background: "linear-gradient(#124177, #0B2647)", height: "100vh" }}>
      <LoginForm />
    </div>
  );
};

export default AuthPage;