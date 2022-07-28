import react from "react";
import { Modal, Container, Button, Row, Col } from "react-bootstrap";
import Inbox from "../Inbox";
import "../Modals/Modal.css";

const InboxModal = (props) => {
  console.log(props);
  return (
    <Modal size={"xl"} centered show={props.isViewingInbox}>
      <Modal.Header closeButton onHide={props.closeInboxModalHandler}>
        <Modal.Title>Inbox</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto">
        <Inbox data={props.data} api={props.api}/>
      </Modal.Body>
      <Modal.Footer className="justify-content-center"></Modal.Footer>
    </Modal>
  );
};

export default InboxModal;
