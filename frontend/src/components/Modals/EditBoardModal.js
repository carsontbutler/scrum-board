import react, { useState } from "react";
import { Modal, Container, Button, Row, Col } from "react-bootstrap";
import EditBoardForm from "../Forms/EditBoardForm";
import EditBoardSettingsForm from "../Forms/EditBoardSettingsForm";
import "./Modal.css";

const EditBoardModal = (props) => {
  const [showSettings, setShowSettings] = useState(true);
  const [showColumns, setShowColumns] = useState(false);

  const showSettingsHandler = () => {
    setShowSettings(true);
    setShowColumns(false);
  };

  const showColumnsHandler = () => {
    setShowColumns(true);
    setShowSettings(false);
  };
  return (
    <Modal size={"xl"} centered show={props.isEditingBoard}>
      <Modal.Header closeButton onHide={props.closeEditBoardModal}>
        <Modal.Title>Editing {props.data.activeBoardData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <EditBoardForm
            api={props.api}
            data={props.data}
            setData={props.setData}
            closeEditBoardModal={props.closeEditBoardModal}
            showColumns={showColumns}
            showColumnsHandler={showColumnsHandler}
            showSettings={showSettings}
            showSettingsHandler={showSettingsHandler}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          {showSettings ? (
            <Row>
              <Col>
                <Button
                  type="submit"
                  form="editBoardSettingsForm"
                  className="save-btn"
                >
                  Save
                </Button>
              </Col>
              <Col>
                <div className="cancel-btn">
                  <Button
                    onClick={props.closeEditBoardModal}
                    className="cancel-btn"
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          ) : (
            <div className="cancel-btn">
            <Button onClick={props.closeEditBoardModal} className="cancel-btn">
              Close
            </Button>
            </div>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBoardModal;
