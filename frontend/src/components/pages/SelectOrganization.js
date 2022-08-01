import React from "react";
import { Button, Row, Container, Col } from "react-bootstrap";
import "./SelectScreen.css";

const SelectOrganization = (props) => {

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xl={8} lg={8} md={10} sm={12} xs={12}>
          <div className="selection-card p-2">
            <div className="card-header">
              <h1 className="text-center">Your organizations</h1>
            </div>
            <Row>
              <Col></Col>
              <Col xl={8} lg={8} md={10} sm={12} xs={12}>
                {props.data.organizations.length > 0 ? (
                  props.data.organizations.map((org) => (
                    <Row className="select-buttons">
                      <Button
                        onClick={props.api.selectOrganization}
                        key={org.id}
                        id={org.id}
                        size="lg"
                      >
                        {org.name}
                      </Button>
                    </Row>
                  ))
                ) : (
                  <h6 className="text-center p-3">
                    You aren't a member of any organizations yet.
                  </h6>
                )}
                <Row className="new-button mt-2">
                  <Col>
                    <button
                      onClick={props.showJoinOrganizationModal}
                      size="lg"
                    >
                      Join
                    </button>
                  </Col>
                  <Col>
                    <button
                      onClick={props.showCreateOrganizationModal}
                      size="lg"
                    >
                      Create
                    </button>
                  </Col>
                </Row>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectOrganization;
