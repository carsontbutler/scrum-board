import React, { useContext } from "react";
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import DataContext from "./store/data-context";

const ViewTicket = (props) => {
  const dataCtx = useContext(DataContext);
  return (
    <Row className="justify-content-center">
      <Col xl={7} lg={7} md={7} sm={7} xs={7}>
        <div className="content-section">
          <h6>Description</h6>
          <p className="textbox">{dataCtx.activeTicket.description}</p>
        </div>
        <div className="content-section">
          <h6>Reproduction Steps</h6>
          <p className="textbox">{dataCtx.activeTicket.repro_steps}</p>
        </div>
        <div className="content-section">
          <h6>Acceptance Criteria</h6>
          <p className="textbox">{dataCtx.activeTicket.acceptance_criteria}</p>
        </div>
        <div className="comment-section">Comments</div>
      </Col>
      <Col className="text-center right-col" xl={5} lg={5} md={5} sm={5} xs={5}>
        <Row className="detail-row">
          <Col>
            <h6>Assignee</h6>
          </Col>
          <Col>
            <h6>{dataCtx.activeTicket.assignee ? dataCtx.activeOrganization.users.find(e=>e.id == dataCtx.activeTicket.assignee).username : "none"}</h6>
          </Col>
        </Row>
        <Row className="detail-row">
          <Col>
            <h6>Reporter</h6>
          </Col>
          <Col>
            <h6>{dataCtx.activeOrganization.users.find(e=>e.id==dataCtx.activeTicket.reporter).username}</h6>
          </Col>
        </Row>
        <Row className="detail-row">
          <Col>
            <h6>Column</h6>
          </Col>
          <Col>
            <h6>{dataCtx.activeBoardData.columns.find(e=>e.id==dataCtx.activeTicket.column).name}</h6>
          </Col>
        </Row>
        <Row className="detail-row">
          <Col>
            <h6>Type</h6>
          </Col>
          <Col>
            <h6>{dataCtx.activeTicket.type}</h6>
          </Col>
        </Row>
        <Row className="detail-row">
          <Col>
            <h6>Priority</h6>
          </Col>
          <Col>
            <h6>{dataCtx.activeTicket.priority}</h6>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ViewTicket;
