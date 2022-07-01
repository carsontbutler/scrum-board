import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import CreateBoardForm from "../Forms/CreateBoardForm";

const CreateBoardModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.isCreatingBoard}>
      <Modal.Header closeButton onHide={props.closeCreateBoardModal}>
        <Modal.Title>Creating board for x</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CreateBoardForm
            organizations={props.organizations}
            activeOrganization={props.activeOrganization}
            closeCreateBoardModal={props.closeCreateBoardModal}
            getBoardData={props.getBoardData}
            getInitialData={props.getInitialData}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button type="submit" form="createBoardForm" variant="primary">
          Save
        </Button>
        <Button onClick={props.closeCreateBoardModal} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBoardModal;
