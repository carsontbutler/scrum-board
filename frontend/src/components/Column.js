import React, { useEffect, useContext } from "react";
import { Col, Container } from "react-bootstrap";
import Ticket from "./Ticket";
import "./Column.css";
import DataContext from "../components/store/data-context";

const Column = (props) => {
  const dataCtx = useContext(DataContext);
  const col = props.column;
  console.log(props);
  console.log(col);

  return (
    <Col className="column">
      <h6>
        {col.name} <span className="ticket-count">{col.tickets.length}</span>
      </h6>
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
