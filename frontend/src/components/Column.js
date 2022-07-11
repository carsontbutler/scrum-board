import React, { useEffect, useContext } from "react";
import { Col, Container } from "react-bootstrap";
import Ticket from "./Ticket";
import "./Column.css";
import DataContext from "../components/store/data-context";

const Column = (props) => {
  const dataCtx = useContext(DataContext);
  const col = props.column;

  return (
    <Col className="column">
      <h6>
        {col.name} <span className="ticket-count">{col.tickets.length}</span>
      </h6>
      {col["tickets"].map((ticket) => (
        <Ticket
          onClick={props.api.setActiveTicketHandler}
          ticket={ticket}
          id={ticket.id}
          key={ticket.id}
          viewTicketHandler={props.viewTicketHandler}
          activeOrganization={props.activeOrganization}
          activeBoardData={props.activeBoardData}
          setActiveTicketHandler={props.setActiveTicketHandler}
          activeTicket={props.activeTicket}
          data={props.data}
          api={props.api}
        />
      ))}
    </Col>
  );
};

export default Column;
