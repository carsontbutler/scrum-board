import react, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const CreateOrganizationForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    console.log("submit handler ran");
    e.preventDefault();
    axiosInstance
      .post(
        `${url}/create-organization/`,
        { name: name },
        { headers: { Authorization: "Bearer " + authCtx.access } }
      )
      .then((res) => {
        if (res.status == 200) {
        }
        console.log(res);
        //need the backend to return the id
        //then request the organization data and set the active organization to that id
        props.closeCreateOrganizationModal();
      });
  };

  return (
    <Form onSubmit={submitHandler} id="CreateOrganizationForm">
      <div className="form-content">
        <Form.Group controlId="formName" className="mt-2">
          <h6>Organization Name</h6>
          <Form.Control
            as="textarea"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
      </div>
    </Form>
  );
};

export default CreateOrganizationForm;
