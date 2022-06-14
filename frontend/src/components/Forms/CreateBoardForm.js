import react, { useRef, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import "./CreateBoardForm.css";

const CreateBoardForm = (props) => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef();
  const organizationRef = useRef();
  const prefixRef = useRef();

  const url = "http://localhost:8000/api";

  const submitHandler = (e) => {
    e.preventDefault();
    //check if token is valid?
    const name = nameRef.current.value;
    const organization = organizationRef.current.value;
    const prefix = prefixRef.current.value;

    const axiosInstance = axios.create({
      baseURL: url,
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + authCtx.access,
      },
    });

    axiosInstance
      .post(`${url}/create-board/`, {
        name: name,
        organization: organization,
        prefix: prefix,
      })
      .then((res) => {
        if (res.status == 200) {
          const id = res.data.id.toString();
          props.getInitialData();
          const targetBoard = props.activeOrganization.boards.find(
            (obj) => obj.id == id
          );
          props.closeCreateBoardModal();
        } else {
          console.log(res); //! handle this properly with a message
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="createBoardForm">
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
        <Form.Control as="textarea" ref={nameRef} />
      </Form.Group>
      <Form.Group controlId="formPrefix" className="mt-2">
        <Form.Label>Board Prefix</Form.Label>
        <Form.Control as="textarea" ref={prefixRef} />
      </Form.Group>
    </Form>
  );
};

export default CreateBoardForm;
