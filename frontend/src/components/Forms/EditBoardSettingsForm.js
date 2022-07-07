import react, { useRef, useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import DataContext from "../store/data-context";

// use state to present 2 forms: 1 for editing the name/prefix/organization and another for editing the columns

const EditBoardSettingsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
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
      <Row>
        <Col></Col>
        <Col xl={8} lg={8} md={10} sm={10} xs={12}>
          <Form.Group controlId="formOrganization" className="mt-2">
            <Form.Label className="font-weight-bold">Organization</Form.Label>
            <Form.Select ref={organizationRef}>
              {dataCtx.organizations.map((org) =>
                org.id == dataCtx.activeOrganization.id ? (
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
            <Form.Control
              type="text"
              ref={nameRef}
              defaultValue={dataCtx.activeBoard.name}
            />
          </Form.Group>

          <Form.Group controlId="formPrefix" className="mt-2">
            <Form.Label>Board Prefix</Form.Label>
            <Form.Control
              type="text"
              ref={prefixRef}
              defaultValue={dataCtx.activeBoard.prefix}
            />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default EditBoardSettingsForm;
