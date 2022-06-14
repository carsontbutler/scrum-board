import react, { useRef, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";



// use state to present 2 forms: 1 for editing the name/prefix/organization and another for editing the columns

const EditBoardForm = (props) => {
    const authCtx = useContext(AuthContext);
    const nameRef = useRef();
    const organizationRef = useRef();
    const prefixRef = useRef();

    const url = "http://localhost:8000/api";


    const submitHandler = (e) => {
      e.preventDefault();

      const axiosInstance = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + authCtx.access,
        },
      });
    };

  return (
    <Form onSubmit={submitHandler} id="editBoardForm">
      <Form.Group controlId="formOrganization" className="mt-2">
        <Form.Label>Organization</Form.Label>
        <Form.Select ref={organizationRef}>
          {props.organizations.map((org) =>
            org.id == props.activeOrganization.id ? (
              <option value={org.id} selected>
                {org.name}
              </option>
            ) : (
              <option value={org.id}>{org.name}</option>
            )
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formName" className="mt-2">
        <Form.Label>Board title</Form.Label>
        <Form.Control as="textarea" ref={nameRef} defaultValue={props.activeBoard.name} />
      </Form.Group>
      <Form.Group controlId="formPrefix" className="mt-2">
        <Form.Label>Board Prefix</Form.Label>
        <Form.Control as="textarea" ref={prefixRef} defaultValue={props.activeBoard.prefix}/>
      </Form.Group>
    </Form>
  );
};

export default EditBoardForm;
