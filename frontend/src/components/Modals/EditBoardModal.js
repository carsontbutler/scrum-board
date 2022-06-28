import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import EditBoardForm from "../Forms/EditBoardForm";
import EditBoardSettingsForm from "../Forms/EditBoardSettingsForm";

const EditBoardModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.isEditingBoard}>
      <Modal.Header closeButton onHide={props.closeEditBoardModal}>
        <Modal.Title>Editing (board name)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <EditBoardForm />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button size="lg" onClick={props.closeEditBoardModal} variant="secondary">
          Cancel
        </Button>
        <Button size="lg" type="submit" form="editBoardForm" variant="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBoardModal;
