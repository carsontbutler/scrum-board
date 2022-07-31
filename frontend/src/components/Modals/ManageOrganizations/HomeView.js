import react, { useState, useContext, useEffect } from "react";
import {
  Button,
  Row,
  Container,
  Col,
  Table
} from "react-bootstrap";
import "../Modal.css";
import "../../Inbox.css";

const HomeView = (props) => {
  useEffect(()=>{
    props.api.getInitialData();
  },[]);
  const OrganizationData = (props) => {
    return props.data.organizations
      .sort((a, b) => (a.user_is_owner > b.user_is_owner ? 1 : -1))
      .map((org) => (
        <tr id={org.id} key={org.id}>
          <td>{org.name}</td>
          <td>{org.code}</td>
          <td>{org.role}</td>
          {org.role == "Owner" ? (
            <td className="approve-btn text-center" id={org.id}>
              <Button onClick={props.showManageView} id={org.id}>
                Manage
              </Button>
            </td>
          ) : (
            <td className="text-center" id={org.id}>
              <Button variant="danger" id={org.id}>
                Leave
              </Button>
            </td>
          )}
        </tr>
      ));
  };
  return (
    <Container>
      <div>
        {" "}
        <Row className="organizations">
          <Table striped className="table-header mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Join Code</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <OrganizationData
                organizations={props.data.organizations}
                manageOrgHandler={props.manageOrgHandler}
                data={props.data}
                showManageView={props.showManageView}
              />
            </tbody>
          </Table>
          {props.data.organizations.length == 0 && (
            <h6 className="text-center">
              It looks like you aren't a member of any organizations. Create a
              new one or join an existing one below.
            </h6>
          )}
        </Row>
        <Row className="new-button mt-2 w-50 m-auto actions">
          <Col>
            <button onClick={props.showJoinOrganizationModal} size="sm">
              Join
            </button>
          </Col>
          <Col>
            <button onClick={props.showCreateOrganizationModal} size="sm">
              Create
            </button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default HomeView;
