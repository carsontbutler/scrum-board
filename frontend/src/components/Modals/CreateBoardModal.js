import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import CreateBoardForm from "../Forms/CreateBoardForm";
import "./Modal.css";

const CreateBoardModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.isCreatingBoard}>
      <Modal.Header closeButton onHide={props.closeCreateBoardModal}>
        <Modal.Title>Creating new board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CreateBoardForm
            closeCreateBoardModal={props.closeCreateBoardModal}
            data={props.data}
            setData={props.setData}
            api={props.api}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          <Button type="submit" form="createBoardForm">
            Save
          </Button>
        </div>
        <div className="cancel-btn">
          <Button onClick={props.closeCreateBoardModal}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBoardModal;
