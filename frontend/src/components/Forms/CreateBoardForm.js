import react, { useRef, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const CreateBoardForm = (props) => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef();
  const organizationRef = useRef();
  const prefixRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const organization = organizationRef.current.value;
    const prefix = prefixRef.current.value;
    axiosInstance
      .post(
        `${url}/create-board/`,
        {
          name: name,
          organization: organization,
          prefix: prefix,
        },
        {
          headers: { Authorization: "Bearer " + authCtx.access },
        }
      )
      .then(async (res) => {
        if (res.status == 200) {
          let newBoard = res.data;
          let activeOrg = { ...props.data.activeOrganization };
          activeOrg.boards.push(newBoard);
          props.setData({ ...props.data, activeOrganization: activeOrg });
          props.closeCreateBoardModal();
        } else {
          console.log(res); //! handle this properly with a message
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="createBoardForm">
      <div className="form-content">
        <Form.Group controlId="formOrganization" className="mt-2">
          <h6>Organization</h6>
          <Form.Select ref={organizationRef}>
            {props.data.organizations.map((org) =>
              org.id == props.data.activeOrganization.id ? (
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
          <h6>Board Title</h6>
          <Form.Control as="textarea" ref={nameRef} />
        </Form.Group>
        <Form.Group controlId="formPrefix" className="mt-2">
          <h6>Board Prefix</h6>
          <Form.Control as="textarea" ref={prefixRef} />
        </Form.Group>
      </div>
    </Form>
  );
};

export default CreateBoardForm;
