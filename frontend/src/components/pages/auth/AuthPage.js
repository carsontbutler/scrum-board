import React, { useState } from "react";
import LoginForm from "../../Forms/LoginForm";
import RegisterForm from "../../Forms/RegisterForm";
import { Toast, ToastContainer } from "react-bootstrap";

const AuthPage = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false);
  const hideToastHandler = () => {
    setShowToast(false);
  };

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
          setShowToast={setShowToast}
          setToastMessage={setToastMessage}
        />
        
      )}
      <ToastContainer position="bottom-center">
          <Toast
            className="text-center mx-auto toast mb-5"
            show={showToast}
            onClose={hideToastHandler}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto success-message">Success!</strong>
            </Toast.Header>
            <Toast.Body><h6 className="success-message">{toastMessage}</h6></Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
};

export default AuthPage;
