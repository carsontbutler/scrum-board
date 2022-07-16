import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Toast,
  ToastContainer,
  Button,
  Container,
  Alert
} from "react-bootstrap";
import Column from "./Column";
import AuthContext from "./store/auth-context";
import TicketModal from "./Modals/TicketModal";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import CreateTicketModal from "./Modals/CreateTicketModal";
import { axiosInstance, url } from "./store/api";

const Board = (props) => {
  const authCtx = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  useEffect(() => {
    props.checkForDuplicateColumnPositions(props.data.activeBoardData.columns);
  }, []);

  const showToastHandler = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };
  const hideToastHandler = () => {
    setShowToast(false);
    setToastMessage();
  };

  const showCreateTicketModalHandler = () => {
    setShowCreateTicketModal(true);
  };

  const closeCreateTicketModalHandler = () => {
    setShowCreateTicketModal(false);
  };

  const viewTicketHandler = (e) => {
    const selectedTicket = props.data.activeBoardData.tickets.filter(
      (ticket) => ticket.id == e.target.id
    );
    props.api.setActiveTicket(selectedTicket[0]);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authCtx.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${url}/token/refresh`, {
      refresh: authCtx.refresh,
    });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    req.headers.Authorization = `Bearer  ${response.data.access}`;
    return req;
  });

  return (
    <Row>
      <TicketModal
        closeModalHandler={closeModalHandler}
        showModal={showModal}
        startEditingHandler={startEditingHandler}
        cancelEditHandler={cancelEditHandler}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        showToastHandler={showToastHandler}
        data={props.data}
        api={props.api}
      />

      <CreateTicketModal
        closeCreateTicketModalHandler={closeCreateTicketModalHandler}
        showCreateTicketModal={showCreateTicketModal}
        showToastHandler={showToastHandler}
        data={props.data}
        api={props.api}
      />
      <Col>
        <Container>
          <Row>
            <Col xl={2} lg={2} md={2} sm={2} xs={2} className="my-3">
              <Button
                onClick={props.showEditBoardModal}
                className="btn-secondary-custom"
                variant="secondary"
              >
                Board Settings
              </Button>
            </Col>
            <Col
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={8}
              className="text-center my-3"
            >
              <h4>{props.data.activeBoardData.name}</h4>
            </Col>
            <Col xl={2} lg={2} md={2} sm={2} xs={2} className="my-3">
              <Button
                className="btn-primary-custom"
                onClick={showCreateTicketModalHandler}
              >
                New Ticket
              </Button>
            </Col>
          </Row>
        </Container>
        {props.foundDuplicateColPosition && (
          <Row>
            <Alert variant="danger" className="text-center">Warning: Two or more of your columns are assigned to the same position. This should be fixed in the Board Settings menu to prevent incorrect ordering.</Alert>
          </Row>
        )}
        <Row>
          {props.data.activeBoardData["columns"]
            .sort((a, b) => {
              return a.position - b.position;
            })
            .map((col) => (
              <Column
                column={col}
                key={col.id}
                viewTicketHandler={viewTicketHandler}
                data={props.data}
                api={props.api}
              />
            ))}
        </Row>
        <ToastContainer position="bottom-center">
          <Toast
            className="text-center mx-auto toast mb-5"
            show={showToast}
            onClose={hideToastHandler}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

export default Board;
