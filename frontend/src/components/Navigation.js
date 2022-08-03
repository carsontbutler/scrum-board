import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
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
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <Nav.Link onClick={props.showInboxModalHandler}>Inbox</Nav.Link>
              <Nav.Link
                onClick={props.showManageOrganizationsModalHandler}
              >
                Manage
              </Nav.Link>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </NavDropdown>
            <NavDropdown
              title={
                props.data.activeOrganization
                  ? props.data.activeOrganization.name
                  : "Organizations"
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
                  <div className="text-center">
                    {props.data.activeOrganization.name}
                  </div>
                  <NavDropdown.Divider />
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
