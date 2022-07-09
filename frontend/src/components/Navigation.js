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

  const switchOrganizationHandler = (e) => {
    console.log(dataCtx);
    dataCtx.setActiveOrganization(e);
    console.log(dataCtx.activeOrganization);

  };

  const switchBoardHandler = async (board) => {
    console.log("get tickets handler: ");
    const id = board.target.id;
    console.log(id);
    const targetBoard = dataCtx.activeOrganization.boards.find(
      (obj) => obj.id == id
    );
    console.log(targetBoard);
    dataCtx.setActiveBoard(targetBoard);
    const response = await axiosInstance
      .get(`/board/${id}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          dataCtx.setActiveBoardData(response.data);
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
                dataCtx.activeOrganization
                  ? dataCtx.activeOrganization.name
                  : "Organization"
              }
              id="basic-nav-dropdown"
            >
              {dataCtx.organizations.map((org) => (
                <NavDropdown.Item
                  className="nav-dropdown"
                  onClick={switchOrganizationHandler}
                  id={org.id}
                  key={org.id}
                >
                  {org.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title="Boards" id="basic-nav-dropdown">
              {dataCtx.activeOrganization ? (
                <div>
                  {dataCtx.activeOrganization.boards.map((board) => (
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
