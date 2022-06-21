import React, { useContext} from "react";
import {useHistory} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "./store/auth-context";
import DataContext from "./store/data-context";
import "./Navigation.css";


const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  console.log(dataCtx.activeBoard);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Scrum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown  title={dataCtx.activeOrganization ? dataCtx.activeOrganization.name : "Organization"} id="basic-nav-dropdown">
              {dataCtx.organizations.map((org) => (
                <NavDropdown.Item className="nav-dropdown"
                  onClick={dataCtx.setActiveOrganization}
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
                      onClick={props.getTicketsHandler}
                      id={board.id}
                      key={board.id}
                    >
                      {board.name}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="dropdown-header text-center" onClick={props.showCreateBoardModal}>
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
