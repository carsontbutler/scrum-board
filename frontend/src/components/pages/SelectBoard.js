import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import { Button, Row, Container, Col } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";
import "./SelectScreen.css";

const SelectBoard = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(props.data.activeOrganization);

  
  const fetchActiveBoardData = async (e) => {
    console.log(e.target);
    console.log("fetchActiveBoardData");
    await axiosInstance
      .get(`${url}/board/${e.target.id}/tickets/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        props.api.setActiveBoardData(res.data);
        props.api.setActiveBoard(
          props.data.activeOrganization.boards.find(
            (obj) => obj.id == e.target.id
          )
        );
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xl={8} lg={8} md={10} sm={12} xs={12}>
          <div className="selection-card p-2">
            <div className="card-header">
              <h1 className="text-center">
                {props.data.activeOrganization.name} boards
              </h1>
              <h6 className="text-center">(Join code: {props.data.activeOrganization.code})</h6>
            </div>
            <Row>
              <Col></Col>
              <Col xl={8} lg={8} md={10} sm={12} xs={12}>
                {props.data.activeOrganization.boards.map((board) => (
                  <Row className="select-buttons">
                    <Button
                      id={board.id}
                      key={board.id}
                      onClick={props.api.fetchAndSetActiveBoardData}
                    >
                      {board.name}
                    </Button>
                  </Row>
                ))}
                <Row className="new-button">
                  <Button size="lg" onClick={props.showCreateBoardModal}>New</Button>
                </Row>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectBoard;
