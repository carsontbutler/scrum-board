import React, { useContext } from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import "./TicketModal.css";
import ViewTicket from "./ViewTicket";
import EditTicketForm from "./Forms/EditTicketForm";
import DataContext from "./store/data-context";

const TicketModal = (props) => {
  const dataCtx = useContext(DataContext);
  console.log(props);

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
              activeBoardData={props.activeBoardData}
              activeOrganization={props.activeOrganization}
              activeTicket={props.activeTicket}
              fetchAndSetActiveBoardData={props.fetchAndSetActiveBoardData}
              fetchUpdatedBoardData={props.fetchUpdatedBoardData}
              data={props.data}
              api={props.api}
            />
          ) : (
            <ViewTicket
              activeTicket={props.activeTicket}
              setActiveTicket={props.setActiveTicket}
              activeOrganization={props.activeOrganization}
              activeBoardData={props.activeBoardData}
              data={props.data}
              api={props.api}
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
