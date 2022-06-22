import React, { useRef, useContext, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";

const EditTicketForm = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const reproStepsRef = useRef();
  const acceptanceCriteriaRef = useRef();
  const assigneeRef = useRef();
  const columnRef = useRef();
  const typeRef = useRef();
  const priorityRef = useRef();
  const ticketNum = dataCtx.activeTicket.id;
  const url = "http://localhost:8000/api";

  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const openDeleteHandler = () => {
    setIsDeleting(true);
  };
  const closeDeleteHandler = () => {
    setIsDeleting(false);
  };

  const deleteTicketHandler = () => {
    axiosInstance
      .delete(`${url}/ticket/${dataCtx.activeTicket.id}/delete/`)
      .then((res) => {
        if (res.status == 204) {
          props.closeModalHandler();
          props.getBoardData();
          props.showToastHandler(`Ticket deleted successfully`);
        } else {
          props.showToastHandler(`Something went wrong`);
        }
      });
  };

  console.log(props);

  const submitHandler = (e) => {
    e.preventDefault();
    //check if token is valid?
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const reproSteps = reproStepsRef.current.value;
    const acceptanceCriteria = acceptanceCriteriaRef.current.value;
    const assignee = assigneeRef.current.value;
    const column = columnRef.current.value;
    const type = typeRef.current.value;
    const priority = priorityRef.current.value;

    axiosInstance
      .patch(`${url}/ticket/${ticketNum}/update/`, {
        title: title,
        description: description,
        repro_steps: reproSteps,
        acceptance_criteria: acceptanceCriteria,
        assignee: assignee,
        column: column,
        type: type,
        priority: priority,
      })
      .then((res) => {
        if (res.status == 200) {
          props.closeModalHandler();
          props.getBoardData();
          props.showToastHandler(`Ticket # - saved successfully`);
        } else {
          console.log("handle error"); //! handle this properly with a message
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="editTicketForm">
      <Row className="justify-content-center">
        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
          <div className="content-section">
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={dataCtx.activeTicket.title}
                ref={titleRef}
              />
            </Form.Group>
          </div>

          <div className="content-section">
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={dataCtx.activeTicket.description}
                ref={descriptionRef}
              />
            </Form.Group>
          </div>

          <div className="content-section">
            <Form.Group controlId="formReproSteps">
              <Form.Label>Reproduction Steps</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={dataCtx.activeTicket.repro_steps}
                ref={reproStepsRef}
              />
            </Form.Group>
          </div>
          <div className="content-section">
            <Form.Group controlId="formAcceptanceCriteria">
              <Form.Label>Acceptance Criteria</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={dataCtx.activeTicket.acceptance_criteria}
                ref={acceptanceCriteriaRef}
              />
            </Form.Group>
          </div>
        </Col>
        <Col
          className="text-center right-col"
          xl={5}
          lg={5}
          md={5}
          sm={5}
          xs={5}
        >
          <Row className="detail-row">
            <Col>
              <h6>Assignee</h6>
            </Col>
            <Col>
              <Form.Group controlId="formAssignee">
                <Form.Select ref={assigneeRef}>
                  <option label=" "></option>
                  {dataCtx.activeOrganization.users.map((user) =>
                    dataCtx.activeTicket.assignee === user.id ? (
                      <option value={user.id} selected>
                        {user.username}
                      </option>
                    ) : (
                      <option value={user.id}>{user.username}</option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6>Reporter</h6>
            </Col>
            <Col>
              <h6>
                {
                  dataCtx.activeOrganization.users.find(
                    (e) => e.id == dataCtx.activeTicket.reporter
                  ).username
                }
              </h6>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6>Column</h6>
            </Col>
            <Col>
              <Form.Group controlId="formColumn">
                <Form.Select ref={columnRef}>
                  {dataCtx.activeBoardData.columns.map((column) =>
                    column.id == dataCtx.activeTicket.column ? (
                      <option selected value={column.id}>
                        {column.name}
                      </option>
                    ) : (
                      <option value={column.id}>{column.name}</option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6>Type</h6>
            </Col>
            <Col>
              <Form.Group controlId="formType">
                <Form.Select
                  ref={typeRef}
                  defaultValue={dataCtx.activeTicket.type}
                  aria-label="type"
                >
                  {dataCtx.activeTicket.type == "Bug" ? (
                    <option value="Bug" selected>
                      Bug
                    </option>
                  ) : (
                    <option value="Bug">Bug</option>
                  )}
                  {dataCtx.activeTicket.type == "Improvement" ? (
                    <option value="Improvement" selected>
                      Improvement
                    </option>
                  ) : (
                    <option value="Improvement">Improvement</option>
                  )}
                  {dataCtx.activeTicket.type == "Task" ? (
                    <option value="Task" selected>
                      Task
                    </option>
                  ) : (
                    <option value="Task">Task</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6>Priority</h6>
            </Col>
            <Col>
              <Form.Group controlId="formPriority">
                <Form.Select ref={priorityRef} aria-label="priority">
                  {dataCtx.activeTicket.priority == "Low" ? (
                    <option value="Low" selected>
                      Low
                    </option>
                  ) : (
                    <option value="Low">Low</option>
                  )}
                  {dataCtx.activeTicket.priority == "Medium" ? (
                    <option value="Medium" selected>
                      Medium
                    </option>
                  ) : (
                    <option value="Medium">Medium</option>
                  )}
                  {dataCtx.activeTicket.priority == "High" ? (
                    <option value="High" selected>
                      High
                    </option>
                  ) : (
                    <option value="High">High</option>
                  )}
                  {dataCtx.activeTicket.priority == "Highest" ? (
                    <option value="Highest" selected>
                      Highest
                    </option>
                  ) : (
                    <option value="Highest">Highest</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Button
                variant="outline-danger"
                className="mt-5"
                onClick={openDeleteHandler}
              >
                Delete ticket
              </Button>
              {isDeleting && (
                <div>
                  <h6 className="mt-3">
                    Are you sure you want to delete this ticket?
                  </h6>
                  <Button
                    variant="danger"
                    classname="m-2"
                    onClick={deleteTicketHandler}
                  >
                    Yes, delete
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="m-2"
                    onClick={closeDeleteHandler}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default EditTicketForm;
