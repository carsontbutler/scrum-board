import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import DataContext from "./store/data-context";
import "./Navigation.css";
import axios from "axios";
import { axiosInstance, url } from "./store/api";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    props.setData({});
    authCtx.logout();
    window.location.reload();
  };

  const switchBoardHandler = async (board) => {
    props.setFoundDuplicateColPosition(false);
    const id = board.target.id;
    const targetBoard = props.data.activeOrganization.boards.find(
      (obj) => obj.id == id
    );
    await axiosInstance
      .get(`/board/${id}/tickets`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((response) => {
        if (response.status === 200) {
          props.api.setActiveBoardData(response.data);
          props.api.setActiveBoard(targetBoard);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  return (
    <Navbar
      className="text-gray"
      style={{ background: "linear-gradient(#003366, #000044)" }}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#home">Scrum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown
              title={
                props.data.activeOrganization
                  ? props.data.activeOrganization.name
                  : "Organization"
              }
              id="basic-nav-dropdown"
            >
              {props.data.organizations.map((org) => (
                <NavDropdown.Item
                  className="nav-dropdown"
                  onClick={props.api.selectOrganization}
                  id={org.id}
                  key={org.id}
                >
                  {org.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Boards" id="basic-nav-dropdown">
              {props.data.activeOrganization ? (
                <div>
                  {props.data.activeOrganization.boards.map((board) => (
                    <NavDropdown.Item
                      onClick={switchBoardHandler}
                      id={board.id}
                      key={board.id}
                    >
                      {board.name}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="dropdown-header text-center"
                    onClick={props.showCreateBoardModal}
                  >
                    New board
                  </NavDropdown.Item>
                </div>
              ) : (
                <h6 className="text-center">No organization selected</h6>
              )}
            </NavDropdown>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
