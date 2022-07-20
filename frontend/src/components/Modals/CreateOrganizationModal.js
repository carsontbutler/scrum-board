import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import CreateOrganizationForm from "../Forms/CreateOrganizationForm";
import "./Modal.css";

const CreateOrganizationModal = (props) => {
  return (
    <Modal size={"md"} centered show={props.isCreatingOrganization}>
      <Modal.Header closeButton onHide={props.closeCreateOrganizationModal}>
        <Modal.Title>Creating new organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <CreateOrganizationForm
            closeCreateOrganizationModal={props.closeCreateOrganizationModal}
            data={props.data}
            setData={props.setData}
            api={props.api}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          <Button type="submit" form="createOrganizationForm">
            Save
          </Button>
        </div>
        <div className="cancel-btn">
          <Button onClick={props.closeCreateOrganizationModal}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateOrganizationModal;
