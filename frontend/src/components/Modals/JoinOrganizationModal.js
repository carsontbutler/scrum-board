import react from "react";
import { Modal, Container, Button } from "react-bootstrap";
import JoinOrganizationForm from "../Forms/JoinOrganizationForm";
import "./Modal.css";

const JoinOrganizationModal = (props) => {
  
  return (
    <Modal size={"md"} centered show={props.isJoiningOrganization}>
      <Modal.Header closeButton onHide={props.closeJoinOrganizationModal}>
        <Modal.Title>Join organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <JoinOrganizationForm
            closeJoinOrganizationModal={props.closeJoinOrganizationModal}
            data={props.data}
            setData={props.setData}
            api={props.api}
            setToastMessage={props.setToastMessage}
            setShowToast={props.setShowToast}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="save-btn">
          <Button type="submit" form="JoinOrganizationForm">
            Request
          </Button>
        </div>
        <div className="cancel-btn">
          <Button onClick={props.closeJoinOrganizationModal}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default JoinOrganizationModal;
