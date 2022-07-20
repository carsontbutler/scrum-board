import react from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import CreateTicketForm from "../Forms/CreateTicketForm";
import "./Modal.css";

const CreateTicketModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.showCreateTicketModal}>
      <Modal.Header closeButton onHide={props.closeCreateTicketModalHandler}>
        <Modal.Title className="modal-title">Creating new ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CreateTicketForm
            closeCreateTicketModalHandler={props.closeCreateTicketModalHandler}
            showToastHandler={props.showToastHandler}
            api={props.api}
            data={props.data}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          <Button type="submit" form="createTicketForm" variant="primary">
            Save
          </Button>
        </div>
        <div className="cancel-btn">
          <Button
            onClick={props.closeCreateTicketModalHandler}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTicketModal;
