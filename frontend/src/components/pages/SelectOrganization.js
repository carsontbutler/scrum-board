import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { Button, Row, Container, Col } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";

const SelectOrganization = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Container>
      <h1 className="text-center">Select organization</h1>
      <Row >
        <Col></Col>
        <Col xl={8} lg={8} md={10} sm={12} xs={12}>
          {props.data.organizations.map((org) => (
            <Row>
              <Button
                onClick={props.api.setOrganization}
                variant="dark"
                key={org.id}
                id={org.id}
                size="lg"
              >
                {org.name}
              </Button>
            </Row>
          ))}
          <Row>
            <Button variant="outline-dark" size="lg">
              New
            </Button>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SelectOrganization;
