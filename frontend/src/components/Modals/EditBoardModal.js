import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import EditBoardForm from "../Forms/EditBoardForm";
import EditBoardSettingsForm from "../Forms/EditBoardSettingsForm";
import "./EditBoardModal.css";

const EditBoardModal = (props) => {
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
            closeEditBoardModal={props.closeEditBoardModal}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div id="save-btn">
          <Button
            type="submit"
            form="editBoardForm"
            className="save-btn"
          >
            Save
          </Button>
        </div>
        <div id="cancel-btn">
          <Button
            onClick={props.closeEditBoardModal}
            className="cancel-btn"
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBoardModal;
