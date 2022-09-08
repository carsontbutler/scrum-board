import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import "./Navigation.css";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    props.setData({});
    authCtx.logout();
    window.location.reload();
  };

  const switchBoardHandler = async (e) => {
    props.setFoundDuplicateColPosition(false);
    await props.api.fetchAndSetActiveBoardData(e);
  };

  let username = localStorage.getItem("username");

  return (
    <Navbar
      className="text-gray"
      style={{ background: "linear-gradient(#003366, #000044)" }}
      expand="lg"
      id="navbar"
    >
      <Container>
        <Navbar.Brand href="#home">Scrum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Profile" id="nav-profile">
              <h6 className="m-1">{username}</h6>
              <NavDropdown.Divider />
              <Nav.Link onClick={props.showInboxModalHandler}>Inbox</Nav.Link>
              <Nav.Link
                onClick={props.showManageOrganizationsModalHandler}
              >
                Manage
              </Nav.Link>
              <Nav.Link onClick={logoutHandler} id="logout-btn">
                Logout
              </Nav.Link>
            </NavDropdown>
            <NavDropdown
              title={
                props.data.activeOrganization
                  ? props.data.activeOrganization.name
                  : "Organizations"
              }
              id="nav-organizations"
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
              <NavDropdown.Divider />
              <NavDropdown.Item
                    className="dropdown-header text-center"
                    onClick={props.showCreateOrganizationModal}
                  >
                    New Organization
                  </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Boards" id="nav-boards">
              {props.data.activeOrganization ? (
                <div>
                  <div className="text-center dropdown-header">
                    {props.data.activeOrganization.name}
                  </div>
                  <NavDropdown.Divider />
                  {props.data.activeOrganization.boards.map((board) => (
                    <NavDropdown.Item
                      onClick={switchBoardHandler}
                      id={board.id}
                      key={board.id}
                      className="nav-board-item"
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
