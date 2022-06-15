import React, { useContext } from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import "./TicketModal.css";
import ViewTicket from "./ViewTicket";
import EditTicketForm from "./Forms/EditTicketForm";
import DataContext from "./store/data-context";

const TicketModal = (props) => {
  const dataCtx = useContext(DataContext);


  return (
    <Modal size={"xl"} centered show={props.showModal}>
      <Modal.Header closeButton onHide={props.closeModalHandler}>
        <Modal.Title>
          {props.isEditing && "Editing "}Ticket # / {dataCtx.activeTicket.title}{" "}
          ({dataCtx.activeTicket.type})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.isEditing ? (
            <EditTicketForm
              setIsEditing={props.setIsEditing}
              getBoardData={props.getBoardData}
              closeModalHandler={props.closeModalHandler}
              showToastHandler={props.showToastHandler}
            />
          ) : (
            <ViewTicket />
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {props.isEditing ? (
          <Button onClick={props.cancelEditHandler} variant="secondary">
            Cancel
          </Button>
        ) : (
          <Button onClick={props.startEditingHandler} variant="secondary">
            Edit
          </Button>
        )}
        {props.isEditing && (
          <Button type="submit" form="editTicketForm" value="Submit">
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
