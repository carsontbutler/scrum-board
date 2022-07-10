import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import DataContext from "./store/data-context";
import "./Navigation.css";
import axios from "axios";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const url = "http://localhost:8000/api";
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const switchOrganizationHandler = () => {
    props.setActiveBoard({});
    props.setActiveOrganization("");
  };

  const switchBoardHandler = async (board) => {
    console.log("get tickets handler: ");
    const id = board.target.id;
    console.log(id);
    const targetBoard = props.activeOrganization.boards.find(
      (obj) => obj.id == id
    );
    console.log(targetBoard);
    props.setActiveBoard(targetBoard);
    const response = await axiosInstance
      .get(`/board/${id}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          props.setActiveBoardData(response.data);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Scrum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown
              title={
                props.activeOrganization
                  ? props.activeOrganization.name
                  : "Organization"
              }
              id="basic-nav-dropdown"
            >
              {!props.activeOrganization &&
                props.organizations.map((org) => (
                  <NavDropdown.Item
                    className="nav-dropdown"
                    onClick={props.setOrganization}
                    id={org.id}
                    key={org.id}
                  >
                    {org.name}
                  </NavDropdown.Item>
                ))}

              {props.activeOrganization && (
                <NavDropdown.Item
                  onClick={switchOrganizationHandler}
                  className="dropdown-header text-center"
                >
                  Switch organization
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <NavDropdown title="Boards" id="basic-nav-dropdown">
              {props.activeOrganization ? (
                <div>
                  {props.activeOrganization.boards.map((board) => (
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
            <Nav.Link onClick={authCtx.logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
