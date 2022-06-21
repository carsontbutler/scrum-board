import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import Ticket from "./Ticket";
import "./Column.css";

const Column = (props) => {
  const col = props.column;


  return (
    <Col className="column">
      <h6>
        {col.name} <span className="ticket-count">{col.tickets.length}</span>
      </h6>
      {col["tickets"].map((ticket) => (
        <Ticket
          ticket={ticket}
          key={ticket.id}
          viewTicketHandler={props.viewTicketHandler}
          activeOrganization={props.activeOrganization}
        />
      ))}
    </Col>
  );
};

export default Column;
