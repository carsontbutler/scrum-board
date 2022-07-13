import React from "react";
import LoginForm from "../../Forms/LoginForm";

const AuthPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const showLoginForm = () => { setIsLoggingIn(true) };
  const showRegisterForm = () => { setIsLoggingIn(false) };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(#003366, #000044)",
        height: "100vh",
      }}
    >
      {isLoggingIn ? (<LoginForm />) : (<h6>RegisterForm</h6>)}

    </div>
  );
};

export default AuthPage;
