import react, { useContext, useRef, useState, useEffect } from "react";
import { Modal, Container, Button, Row, Form } from "react-bootstrap";
import "./AddColumnModal.css";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";

const AddColumnModal = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const url = "http://localhost:8000/api/";
  const [columnName, setColumnName] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const axiosInstance = axios.create({
      baseURL: url,
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + authCtx.access,
      },
    });

    axiosInstance
      .post(`${url}column/create/`, {
        board: dataCtx.activeBoardData.id,
        name: columnName,
        position: dataCtx.activeBoardData.columns.length,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("success");
        } else {
          console.log("bad request");
        }
      });
  };

  return (
    <Modal size={"md"} centered show={props.showAddColumnModal}>
      <Modal.Header closeButton onHide={props.closeAddColumnModalHandler}>
        <Modal.Title>Adding new column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="text-center">
            <Form onSubmit={submitHandler} id="addColumnForm">
              <Form.Group className="mt-2">
                <Form.Label>Column name</Form.Label>
                <Form.Control
                  type="text"
                  value={columnName}
                  onChange={(e) => {
                    setColumnName(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={submitHandler} size="md" variant="primary">
          Save
        </Button>
        <Button size="md" variant="outline-primary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddColumnModal;
