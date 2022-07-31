import React, { useEffect, useContext } from "react";
import { Col, Container } from "react-bootstrap";
import Ticket from "./Ticket";
import "./Column.css";

const Column = (props) => {
  const col = props.column;

  return (
    <Col className="column">
      <div className="column-header">
        <h6>
          {col.name}
          <span className="ticket-count"> {col.tickets.length}</span>
        </h6>
      </div>
      {col["tickets"].map((ticket) => (
        <Ticket
          viewTicketHandler={props.viewTicketHandler}
          ticket={ticket}
          id={ticket.id}
          key={ticket.id}
          data={props.data}
          api={props.api}
        />
      ))}
    </Col>
  );
};

export default Column;
