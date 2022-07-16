import react, { useContext, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import DataContext from "../store/data-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const EditBoardSettingsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [boardName, setBoardName] = useState(props.data.activeBoardData.name);
  const [prefix, setPrefix] = useState(props.data.activeBoardData.prefix);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosInstance
      .patch(
        `${url}/board/${props.data.activeBoard.id}/update/`,
        {
          name: boardName,
          prefix: prefix,
        },
        {
          headers: { Authorization: "Bearer " + authCtx.access },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          props.closeEditBoardModal();
          props.api.fetchUpdatedBoardData(props.data.activeBoardData);
          props.api.getInitialData();
        } else {
          console.log(res);
          console.log("bad request");
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="editBoardSettingsForm">
      <Row>
        <Col></Col>
        <Col xl={8} lg={8} md={10} sm={10} xs={12} className="form-content">
          <Form.Group controlId="formName" className="mt-4">
            <h6>Board title</h6>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoardData.name}
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPrefix" className="mt-4">
            <h6>Prefix</h6>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoardData.prefix}
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
