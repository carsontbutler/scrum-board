import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import "./AddColumnModal.css";
import AddColumnForm from "../Forms/AddColumnForm";

const AddColumnModal = (props) => {
  console.log(props);
  return (
    <Modal size={"md"} centered show={props.showAddColumnModal}>
      <Modal.Header closeButton onHide={props.closeAddColumnModalHandler}>
        <Modal.Title>Adding new column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <AddColumnForm />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button type="submit" form="addColumnForm" size="md" variant="primary">
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
