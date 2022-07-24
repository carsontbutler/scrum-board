import react, { useContext, useState } from "react";
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

  let requests = []

  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  const showAddColumnModalHandler = () => {
    setShowAddColumnModal(true);
  };
  const closeAddColumnModalHandler = () => {
    setShowAddColumnModal(false);
  };

  const showDeleteModalHandler = (e) => {
    setShowDeleteModal({ show: true, id: e.target.id });
  };
  const closeDeleteModal = () => {
    setShowDeleteModal({ show: false, id: null });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosInstance.patch(`${url}/${id}/update`)
  };

  const MappedColumns = (props) => {
    return props.cols
      .sort((a, b) => {
        return a.position - b.position;
      })
      .map((col, i) => (
        <Row className="form-column text-center">
          <Col xl={2} lg={2} md={2} sm={2} xs={2}>
            <Form.Group controlId={col.id} id={col.id} className="mt-2">
              <Form.Control
                type="number"
                min="0"
                max={props.data.activeBoardData.columns.length}
                defaultValue={col.position}
              />
            </Form.Group>
          </Col>
          <Col xl={8} lg={8} md={8} sm={8} xs={8}>
            <Form.Group controlId={col.id} className="mt-2" id={col.id}>
              <Form.Control
                type="text"
                className="column-name"
                defaultValue={col.name}
              />
            </Form.Group>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1} className="pt-2" id={col.id}>
            <Button
              variant="danger"
              size={22}
              id={col.id}
              className="delete-button"
              onClick={showDeleteModalHandler}
            >
              Delete
            </Button>
          </Col>
          <Col
            xl={1}
            lg={1}
            md={1}
            sm={1}
            xs={1}
            className="pt-2"
            id={col.id}
          ></Col>
          {showDeleteModal.show == true && (
            <DeleteColumnModal
              data={props.data}
              api={props.api}
              showDeleteModal={showDeleteModal}
              closeDeleteModal={closeDeleteModal}
            />
          )}
        </Row>
      ));
  };

  return (
    <Form onSubmit={submitHandler} id="editBoardColumnsForm">
      <Row className="mt-3">
        <Col xl={2} lg={2} md={2} sm={2} xs={2} className="form-content">
          <h6>Position</h6>
        </Col>
        <Col xl={8} lg={8} md={8} sm={8} xs={8} className="form-content">
          <h6>Column name</h6>
        </Col>
        <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
      </Row>
      <Col></Col>
      <MappedColumns
        cols={props.data.activeBoardData.columns}
        data={props.data}
        api={props.api}
      />
      {showAddColumnModal && (
        <AddColumnModal
          showAddColumnModal={showAddColumnModal}
          closeAddColumnModalHandler={closeAddColumnModalHandler}
          data={props.data}
          setData={props.setData}
          api={props.api}
        />
      )}
      <div className="add-btn">
        <Button
          onClick={showAddColumnModalHandler}
          className="mt-3"
          variant="outline-primary"
        >
          Add column
        </Button>
      </div>
    </Form>
  );
};

export default EditBoardColumnsForm;
