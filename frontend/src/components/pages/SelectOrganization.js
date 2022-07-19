import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { Button, Row, Container, Col } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";
import "./SelectScreen.css";

const SelectOrganization = (props) => {
  const authCtx = useContext(AuthContext);


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
                {props.data.organizations.map((org) => (
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
                ))}
                <Row className="new-button">
                  <Button size="lg">New</Button>
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
