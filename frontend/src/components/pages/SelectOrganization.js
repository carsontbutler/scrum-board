import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { Button, Row, Container, Col } from "react-bootstrap";
import { axiosInstance, url } from "../store/api";

const SelectOrganization = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const setOrganization = (e) => {
    let targetOrg = props.organizations.find((obj) => obj.id == e.target.id);
    console.log(targetOrg);
    props.setActiveOrganization(targetOrg);
    console.log(targetOrg);
  };

  return (
    <Container>
      <h1 className="text-center">Select an organization</h1>
      <Row>
        {props.organizations.map((org) => (
          <Button
            onClick={setOrganization}
            variant="outline-dark"
            key={org.id}
            id={org.id}
          >
            {org.name}
          </Button>
        ))}
      </Row>
    </Container>
  );
};

export default SelectOrganization;
