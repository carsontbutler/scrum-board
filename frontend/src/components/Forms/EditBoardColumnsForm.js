import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";
import AuthContext from "../store/auth-context";
import DeleteColumnModal from "../Modals/DeleteColumnModal";
import AddColumnModal from "../Modals/AddColumnModal";
import "../Modals/Modal.css";

const EditBoardColumnsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: null,
  });
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const showAddColumnModalHandler = () => {
    setShowAddColumnModal(true);
  };
  const closeAddColumnModalHandler = () => {
    setShowAddColumnModal(false);
  };

  const showDeleteModalHandler = (e) => {
    console.log(e.target);
    setShowDeleteModal({ show: true, id: e.target.id });
  };
  const closeDeleteModal = () => {
    setShowDeleteModal({ show: false, id: null });
  };

  const EditColumnForm = (props) => {
    let formId = `editBoardForm${props.col.id}`;
    const [colPosition, setColPosition] = useState(props.col.position);
    const [colName, setColName] = useState(props.col.name);
    const [isEditing, setIsEditing] = useState(false);

    const submitHandler = async (e) => {
      props.setErrorMessage("");
      let maxPositionValue = props.activeBoardData.columns.length - 1;
      if (colPosition > maxPositionValue) {
        props.setErrorMessage(`Max position value is ${maxPositionValue}`)
        return
      }
      e.preventDefault();
      await axiosInstance
        .put(
          `${url}/column/${props.col.id}/update/`,
          { position: colPosition, name: colName },
          { headers: { Authorization: "Bearer " + authCtx.access } }
        )
        .then((res) => {
          if (res.status == 200) {
            props.api.fetchUpdatedBoardData(props.activeBoardData);
          }
        }).catch(() => { props.data.setError("Something went wrong.") });
    };

    const startEditingHandler = () => {
      setIsEditing(true);
    };

    const stopEditingHandler = () => {
      setIsEditing(false);
      setColName(props.col.name);
      setColPosition(props.col.position);
    };

    return (
      <Form onSubmit={submitHandler} id={formId}>
        <Row className="mt-3">
          <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2} className="form-content">
            <h6>Position</h6>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6} className="form-content">
            <h6>Column name</h6>
          </Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2}></Col>
        </Row>
        <Row className="form-column text-center">
          <Col xl={2} lg={2} md={2} sm={2} xs={2}>
            <div className="align-items-center pt-2">
              {!isEditing ? (
                <Button
                  onClick={startEditingHandler}
                  variant="outline-primary"
                  className="edit-btn"
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={stopEditingHandler}
                  variant="outline-secondary"
                >
                  X
                </Button>
              )}
            </div>
          </Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2}>
            <Form.Group
              controlId={props.col.id}
              id={props.col.id}
              className="mt-2"
            >
              <Form.Control
                disabled={!isEditing}
                type="number"
                min="0"
                max={props.activeBoardData.columns.length}
                value={colPosition}
                onChange={(e) => {
                  setColPosition(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <Form.Group
              controlId={props.col.id}
              className="mt-2"
              id={props.col.id}
            >
              <Form.Control
                disabled={!isEditing}
                type="text"
                className="column-name"
                value={colName}
                onChange={(e) => {
                  setColName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          {isEditing ? (
            <Col xl={2} lg={2} md={2} sm={2} xs={2}>
              <div className="align-items-center pt-2">
                <Button
                  type="submit"
                  size={22}
                  className="edit-btn"
                  onClick={submitHandler}
                >
                  Save
                </Button>
              </div>
            </Col>
          ) : (
            <Col xl={2} lg={2} md={2} sm={2} xs={2}>
              <div className="align-items-center pt-2">
                <Button
                  variant="danger"
                  size={22}
                  className="delete-button"
                  onClick={showDeleteModalHandler}
                  id={props.col.id}
                >
                  Delete
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Form>
    );
  };

  return (
    <div>
      {props.data.activeBoardData.columns.map((col) => (
        <EditColumnForm
          col={col}
          activeBoardData={props.data.activeBoardData}
          api={props.api}
          setErrorMessage={setErrorMessage}
          key={col.id}
        />
      ))}
      {showDeleteModal.show == true && (
        <DeleteColumnModal
          data={props.data}
          api={props.api}
          showDeleteModal={showDeleteModal}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {showAddColumnModal && (
        <AddColumnModal
          showAddColumnModal={showAddColumnModal}
          closeAddColumnModalHandler={closeAddColumnModalHandler}
          data={props.data}
          setData={props.setData}
          api={props.api}
        />
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      <div className="add-btn">
        <Button
          onClick={showAddColumnModalHandler}
          className="mt-3"
          variant="outline-primary"
        >
          Add column
        </Button>
      </div>
    </div>
  );
};

export default EditBoardColumnsForm;
