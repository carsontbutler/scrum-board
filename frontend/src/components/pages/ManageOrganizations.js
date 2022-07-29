import react from "react";
import { Button, Row, Container, Col } from "react-bootstrap";

const ManageOrganizations = (props) => {
  return (
    <div className="mt-3">
      <h3 className="text-center">My Organizations</h3>
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
        <Row className="organizations">
            Table here with actions
        </Row>
    </div>
  );
};

export default ManageOrganizations;
