import React, { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import { Button, Row, Container, Col } from "react-bootstrap";

const SelectOrgPage = () => {
  const authCtx = useContext(AuthContext);
  const orgs = authCtx.organizations;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const getBoards = async (id) => {
    await axiosInstance.get(`/organizations/${id}/boards/`).then((response) => {
      if (response.status === 200) {
        if (response.data.length === 0) {
          console.log("redirect to create board page or something");
        } else if (response.data.length === 1) {
          console.log("redirect to the 1 boards page");
        } else if (response.data.length > 1) {
          console.log("redirect to board selection page");
        }
      } else {
        console.log("bad request");
      }
    });
  };

  const getOrganizationHandler = (e) => {
    let selectedId = e.target.id;
    let selectedOrg = orgs.find((e) => e.id == selectedId);
    authCtx.setActiveOrganization(selectedOrg);
    getBoards(selectedId);
  };

  return (
    <Container>
      <h1 className="text-center">Select an organization</h1>
      <Row>
        {orgs.map((org) => (
          <Button
            onClick={getOrganizationHandler}
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

export default SelectOrgPage;
