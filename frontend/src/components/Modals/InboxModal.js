import react from "react";
import { Modal, Container, Button, Row, Col } from "react-bootstrap";
import Inbox from "../Inbox";
import "../Modals/Modal.css";

const InboxModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.isViewingInbox}>
      <Modal.Header closeButton onHide={props.closeInboxModalHandler}>
        <Modal.Title>Inbox</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
        <h4 className="text-center">Join requests</h4>
          <Row className="form-content">
            <Col><h6>Time</h6></Col>
            <Col><h6>Username</h6></Col>
            <Col><h6>Organization</h6></Col>
            <Col><h6>Status</h6></Col>
            <Col></Col>
            <Col></Col>
          </Row>

          {/* Map the below once arrays are available: */}
          <Row>
            <Col>7/26/2022 09:25 AM</Col>
            <Col>Bob</Col>
            <Col>Google (code)</Col>
            <Col>Pending</Col>
            <Col><Button>Accept</Button></Col>
            <Col><Button>Decline</Button></Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center"></Modal.Footer>
    </Modal>
  );
};

export default InboxModal;
