import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import "./TicketModal.css";
import ViewTicket from "./ViewTicket";
import EditTicket from "./EditTicket";

const TicketModal = (props) => {

  return (
    <Modal size={"xl"} centered show={props.showModal}>
      <Modal.Header closeButton onHide={props.closeModalHandler}>
        <Modal.Title>
          {props.isEditing && "Editing "}Ticket # / {props.ticket.title} ({props.ticket.type}
          )
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.isEditing ? (
            <EditTicket
              ticket={props.ticket}
              activeOrganization={props.activeOrganization}
              activeBoardData={props.activeBoardData}
              setIsEditing={props.setIsEditing}
              getBoardData={props.getBoardData}
              closeModalHandler={props.closeModalHandler}
              showToastHandler={props.showToastHandler}
            />
          ) : (
            <ViewTicket
              ticket={props.ticket}
              activeOrganization={props.activeOrganization}
              activeBoardData={props.activeBoardData}
            />
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
