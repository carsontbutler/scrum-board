import react, { useContext, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import DataContext from "../store/data-context";
import { axiosInstance } from "../store/api";

// use state to present 2 forms: 1 for editing the name/prefix/organization and another for editing the columns

const EditBoardSettingsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  console.log(props);

  //set these to default values
  const [boardName, setBoardName] = useState(props.data.activeBoard.name);
  const [organization, setOrganization] = useState(
    props.data.activeOrganization.id
  );
  const [prefix, setPrefix] = useState(props.data.activeBoard.prefix);

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
    //try with new exported axios later
    axiosInstance
      .patch(`${url}/board/${props.data.activeBoard.id}/update/`, {
        name: boardName,
        organization: organization,
        prefix: prefix,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
        } else {
          console.log(res);
          console.log("bad request");
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="editBoardForm">
      <Row>
        <Col></Col>
        <Col xl={8} lg={8} md={10} sm={10} xs={12}>
          <Form.Group controlId="formOrganization" className="mt-2">
            <Form.Label className="font-weight-bold">Organization</Form.Label>
            <Form.Select
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
            >
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
            <Form.Label>Board title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoard.name}
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPrefix" className="mt-2">
            <Form.Label>Board Prefix</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoard.prefix}
              onChange={(e) => {
                setPrefix(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default EditBoardSettingsForm;
