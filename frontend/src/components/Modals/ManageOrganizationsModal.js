import react, { useState } from "react";
import {
  Button,
  Row,
  Container,
  Col,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import "./Modal.css";
import "../Inbox.css";

const ManageOrganizationsModal = (props) => {
  const [view, setView] = useState({ screen: "home" });
  const [selectedOrg, setSelectedOrg] = useState("");

  const manageOrgHandler = (e) => {
    setSelectedOrg(
      props.data.organizations.find((obj) => obj.id == e.target.id)
    );
    setView({ ...view, screen: "manageOrg" });
  };

  const OrganizationData = (props) => {
    return props.organizations
      .sort((a, b) => (a.user_is_owner > b.user_is_owner ? 1 : -1))
      .map((org) => (
        <tr id={org.id} key={org.id}>
          <td>{org.name}</td>
          <td>{org.code}</td>
          <td>{org.role}</td>
          {org.role == "Owner" ? (
            <td className="approve-btn text-center" id={org.id}>
              <Button onClick={manageOrgHandler} id={org.id}>
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

  const HomeView = (props) => {
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
                <OrganizationData organizations={props.data.organizations} />
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

  const ManageView = (props) => {
    console.log(props);
    const goBackHandler = () => {
      props.setSelectedOrg("");
      props.setView({ ...view, screen: "home" });
    };
    const [orgName, setOrgName] = useState(props.selectedOrg.name);

    const submitHandler = (e) => {
      e.preventDefault();
    };

    return (
      <Container>
        <Row>
          <Col xl={3} lg={3} md={2} sm={2} xs={1} className="sidebar">
            <a onClick={goBackHandler} className="previous mx-2">
              &laquo; Return
            </a>
          </Col>
          <Col xl={6} lg={6} md={8} sm={8} xs={10}>
            <div className="form-content">
              <h6>Organization name</h6>
            </div>
            <Row className="edit-org">
              <Form onSubmit={submitHandler} id="edit-org-form">
                <Row>
                  <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={orgName}
                        onChange={(e) => {
                          setOrgName(e.target.value);
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                    <div className="approve-btn">
                      <Button type="submit" form="edit-org-form">
                        Save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Row>
            <Row className="mt-5 form-content">
              <Table striped>
                <thead>
                  <tr>
                    <th className="form-content">
                      <h6>Members</h6>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.selectedOrg.users
                    .filter((user) => user.id !== props.selectedOrg.owner)
                    .map((user) => (
                      <tr>
                        <td>{user.username}</td>
                        <td className="remove-btn-cell">
                          <Button variant="danger">Remove</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <Col xl={3} lg={3} md={2} sm={2} xs={1}></Col>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Modal
      size={"lg"}
      centered
      show={props.showManageOrganizationsModal}
      fullscreen={false}
      scrollable={true}
    >
      <Modal.Header
        closeButton
        onHide={props.hideManageOrganizationsModalHandler}
        className="mx-3"
      >
        <Modal.Title>My Organizations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {" "}
          {view.screen == "home" && <HomeView data={props.data} />}
          {view.screen == "manageOrg" && (
            <ManageView
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
              setView={setView}
            />
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center"></Modal.Footer>
    </Modal>
  );
};

export default ManageOrganizationsModal;
