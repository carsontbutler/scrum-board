import react from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import CreateTicketForm from "../Forms/CreateTicketForm";

const CreateTicketModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.showCreateTicketModal}>
      <Modal.Header closeButton onHide={props.closeCreateTicketModalHandler}>
        <Modal.Title>Creating new ticket</Modal.Title>
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
        <Button type="submit" form="createTicketForm" variant="primary">
          Save
        </Button>
        <Button
          onClick={props.closeCreateTicketModalHandler}
          variant="secondary"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTicketModal;
