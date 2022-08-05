import react, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const CreateOrganizationForm = (props) => {
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length > 30) {
      setError("Name cannot be longer than 30 characters");
      return;
    }
    axiosInstance
      .post(
        `${url}/create-organization/`,
        { name: name },
        { headers: { Authorization: "Bearer " + authCtx.access } }
      )
      .then((res) => {
        if (res.status == 200) {
        }
        axiosInstance
          .get(`/boards`, {
            headers: { Authorization: "Bearer " + authCtx.access },
          })
          .then((response) => {
            if (response.status === 200) {
              let newOrganizations = response.data.organizations;
              props.setData({ ...props.data, organizations: newOrganizations });
            }
          })
          .catch(() => {
            setError("Something went wrong.");
            return;
          });
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
      {error && <h6 className="error-text mt-3">{error}</h6>}
    </Form>
  );
};

export default CreateOrganizationForm;
