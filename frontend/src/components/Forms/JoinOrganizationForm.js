import react, { useState, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const JoinOrganizationForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.length !== 6){
      setError("Code must be 6 characters.");
      return;
    }

    await axiosInstance
      .post(
        `${url}/requests/send/`,
        { code: code },
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
              props.setToastMessage("Request sent successfully");
              props.setShowToast(true);
            }
          }).catch(() => {
            props.setToastMessage("Something went wrong.");
            props.setShowToast(true);
          });
        props.closeJoinOrganizationModal();
      }).catch(()=>{
        setError("No organization found with the code provided. Make sure the code is valid and try again.")
      });
  };

  return (
    <Form onSubmit={submitHandler} id="JoinOrganizationForm">
      <div className="form-content">
        <Form.Group controlId="formName" className="mt-2">
          <h6>Organization Code</h6>
          <Form.Control
            as="textarea"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </Form.Group>
        {error && <h6 className="error-text mt-3">{error}</h6>}
      </div>
    </Form>
  );
};

export default JoinOrganizationForm;
