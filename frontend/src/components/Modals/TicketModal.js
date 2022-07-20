import React, { useContext } from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import "./TicketModal.css";
import "./Modal.css";
import ViewTicket from "../ViewTicket";
import EditTicketForm from "../Forms/EditTicketForm";

const TicketModal = (props) => {
  return (
    <Modal size={"xl"} centered show={props.showModal}>
      <Modal.Header closeButton onHide={props.closeModalHandler}>
        <Modal.Title>
          {props.isEditing && "Editing "}Ticket # /{" "}
          {props.data.activeTicket.title} ({props.data.activeTicket.type})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.isEditing ? (
            <EditTicketForm
              setIsEditing={props.setIsEditing}
              closeModalHandler={props.closeModalHandler}
              showToastHandler={props.showToastHandler}
              data={props.data}
              api={props.api}
            />
          ) : (
            <ViewTicket
              data={props.data}
              api={props.api}
              setIsEditing={props.setIsEditing}
            />
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {props.isEditing ? (
          <div className="cancel-btn">
            <Button onClick={props.cancelEditHandler} variant="secondary">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="cancel-btn">
            <Button onClick={props.startEditingHandler} variant="secondary">
              Edit
            </Button>
          </div>
        )}
        {props.isEditing && (
          <div className="save-btn">
            <Button type="submit" form="editTicketForm" value="Submit">
              Save
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
