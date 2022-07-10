import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { Button, Row, Container, Col } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";

const SelectBoard = (props) => {
  const authCtx = useContext(AuthContext);

  const fetchActiveBoardData = async (e) => {
    console.log(e.target);
    console.log("fetchActiveBoardData");
    await axiosInstance
      .get(`${url}/board/${e.target.id}/tickets/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        console.log(res.data);
        props.setActiveBoardData(res.data);
        props.setActiveBoard(
          props.activeOrganization.boards.find((obj) => obj.id == e.target.id)
        );
      });
  };

  return (
    <Container>
      <h1 className="text-center">Select a board</h1>
      <Row>
        {props.activeOrganization.boards.map((board) => (
          <Button
            id={board.id}
            key={board.id}
            onClick={props.fetchAndSetActiveBoardData}
          >
            {board.name}
          </Button>
        ))}
        <Button>New</Button>
      </Row>
    </Container>
  );
};

export default SelectBoard;
