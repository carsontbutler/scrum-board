import React, { useState, useEffect, useContext } from "react";
import "./Ticket.css";
import { CaretUp, CaretDown, CaretDoubleUp, Minus } from "phosphor-react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";

const Ticket = (props) => {
  const [borderColor, setBorderColor] = useState("white");

  useEffect(() => {
    switch (props.ticket.type) {
      case "Bug":
        setBorderColor("red");
        break;
      case "Improvement":
        setBorderColor("green");
        break;
      case "Task":
        setBorderColor("blue");
        break;
    }
  }, [props]);

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 50 }}
      overlay={<Tooltip>{props.ticket.title}</Tooltip>}
    >
      <div
        className="ticket"
        style={{ borderLeft: `4.5px solid ${borderColor}`, zIndex: "1000" }}
        id={props.ticket.id}
        onClick={props.viewTicketHandler}
      >
        <Row style={{ pointerEvents: "none" }}>
          <Col
            xl={10}
            lg={10}
            md={10}
            sm={10}
            xs={10}
            style={{ pointerEvents: "none" }}
          >
            <h5 id={props.ticket.id}>
              {props.ticket.title.length > 70
                ? props.ticket.title.slice(0, 70) + "..."
                : props.ticket.title}
            </h5>
            <h6 id={props.ticket.id}>{props.ticket.type}</h6>
            {props.ticket.assignee &&
              props.data.activeOrganization.users.find(
                (user) => user.id == props.ticket.assignee
              ).username}
          </Col>
          <Col
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            style={{ pointerEvents: "none", padding: 0 }}
          >
            {props.ticket.priority == "Low" && (
              <CaretDown size={18} color="blue" id={props.ticket.id} />
            )}
            {props.ticket.priority == "Medium" && (
              <Minus size={18} color="blue" id={props.ticket.id} />
            )}
            {props.ticket.priority == "High" && (
              <CaretUp size={18} color="blue" id={props.ticket.id} />
            )}
            {props.ticket.priority == "Highest" && (
              <CaretDoubleUp size={18} color="blue" />
            )}
          </Col>
        </Row>
      </div>
    </OverlayTrigger>
  );
};

export default Ticket;
