import react, { useRef, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const createOrganizationForm = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
    };
  return (
    <Form onSubmit={submitHandler} id="createBoardForm">
      <div className="form-content">
        <Form.Group controlId="formName" className="mt-2">
          <h6>Organization Name</h6>
          <Form.Control as="textarea"/>
        </Form.Group>
      </div>
    </Form>
  );
};

export default createOrganizationForm;
