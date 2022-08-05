import react, { useContext, useRef, useState, useEffect } from "react";
import { Modal, Container, Button, Row, Form } from "react-bootstrap";
import "./AddColumnModal.css";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";
import "./Modal.css";

const AddColumnModal = (props) => {
  const authCtx = useContext(AuthContext);
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (columnName.length > 25) {
      setError("Max column name length is 25.");
      return;
    }

    axiosInstance
      .post(
        `${url}/column/create/`,
        {
          board: props.data.activeBoardData.id,
          name: columnName,
          position: props.data.activeBoardData.columns.length,
        },
        {
          headers: { Authorization: "Bearer " + authCtx.access },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          props.api.fetchUpdatedBoardData(props.data.activeBoard);
          props.closeAddColumnModalHandler();
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        return;
      });
  };

  return (
    <Modal size={"md"} centered show={props.showAddColumnModal}>
      <Modal.Header closeButton onHide={props.closeAddColumnModalHandler}>
        <Modal.Title>Adding new column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="text-center form-content">
            <Form onSubmit={submitHandler} id="addColumnForm">
              <Form.Group className="mt-2">
                <h6>Column name</h6>
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
          <Row className="text-center error-message">
            {error && <span className="error-text">{error}</span>}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          <Button onClick={submitHandler} size="md" variant="primary">
            Save
          </Button>
        </div>
        <div className="cancel-btn">
          <Button
            onClick={props.closeAddColumnModalHandler}
            size="md"
            variant="outline-primary"
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddColumnModal;
