import React, { useRef, useContext, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";

const EditTicketForm = (props) => {
  const authCtx = useContext(AuthContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const reproStepsRef = useRef();
  const acceptanceCriteriaRef = useRef();
  const assigneeRef = useRef();
  const columnRef = useRef();
  const typeRef = useRef();
  const priorityRef = useRef();
  const ticketNum = props.data.activeTicket.id;

  let activeUsers = props.data.activeOrganization.users.filter(
    (user) => !props.data.activeOrganization.removed_members.includes(user.id)
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const openDeleteHandler = () => {
    setIsDeleting(true);
  };
  const closeDeleteHandler = () => {
    setIsDeleting(false);
  };

  const deleteTicketHandler = () => {
    axiosInstance
      .delete(`${url}/ticket/${props.data.activeTicket.id}/delete/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        if (res.status == 204) {
          props.closeModalHandler();
          props.api.fetchUpdatedBoardData(props.data.activeBoardData);
          props.showToastHandler(`Ticket deleted successfully`);
        } else {
          props.showToastHandler(`Something went wrong`);
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const reproSteps = reproStepsRef.current.value;
    const acceptanceCriteria = acceptanceCriteriaRef.current.value;
    const assignee = assigneeRef.current.value;
    const column = columnRef.current.value;
    const type = typeRef.current.value;
    const priority = priorityRef.current.value;

    axiosInstance
      .patch(
        `${url}/ticket/${ticketNum}/update/`,
        {
          title: title,
          description: description,
          repro_steps: reproSteps,
          acceptance_criteria: acceptanceCriteria,
          assignee: assignee,
          column: column,
          type: type,
          priority: priority,
        },
        {
          headers: { Authorization: "Bearer " + authCtx.access },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          props.closeModalHandler();
          props.api.fetchUpdatedBoardData(props.data.activeBoardData);
          props.showToastHandler(`Ticket # - saved successfully`);
        } else {
          console.log("handle error"); //! handle this properly with a message
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="editTicketForm">
      <Row className="justify-content-center form-content">
        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
          <div className="content-section">
            <Form.Group controlId="formTitle">
              <h6 className="mt-2">Title</h6>
              <Form.Control
                as="textarea"
                defaultValue={props.data.activeTicket.title}
                ref={titleRef}
              />
            </Form.Group>
          </div>

          <div className="content-section">
            <Form.Group controlId="formDescription">
              <h6 className="mt-2">Description</h6>
              <Form.Control
                as="textarea"
                defaultValue={props.data.activeTicket.description}
                ref={descriptionRef}
              />
            </Form.Group>
          </div>

          <div className="content-section">
            <Form.Group controlId="formReproSteps">
              <h6 className="mt-2">Reproduction Steps</h6>
              <Form.Control
                as="textarea"
                defaultValue={props.data.activeTicket.repro_steps}
                ref={reproStepsRef}
              />
            </Form.Group>
          </div>
          <div className="content-section">
            <Form.Group controlId="formAcceptanceCriteria">
              <h6 className="mt-2">Acceptance Criteria</h6>
              <Form.Control
                as="textarea"
                defaultValue={props.data.activeTicket.acceptance_criteria}
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
              <h6 className="mt-2">Assignee</h6>
            </Col>
            <Col>
              <Form.Group controlId="formAssignee">
                <Form.Select ref={assigneeRef}>
                  <option label=" "></option>
                  {activeUsers.map((user) =>
                    props.data.activeTicket.assignee === user.id ? (
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
              <h6 className="mt-2">Reporter</h6>
            </Col>
            <Col>
              <h6 className="plain-h6 mt-2">
                {
                  props.data.activeOrganization.users.find(
                    (e) => e.id == props.data.activeTicket.reporter
                  ).username
                }
              </h6>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6 className="mt-2">Column</h6>
            </Col>
            <Col>
              <Form.Group controlId="formColumn">
                <Form.Select ref={columnRef}>
                  {props.data.activeBoardData.columns.map((column) =>
                    column.id == props.data.activeTicket.column ? (
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
              <h6 className="mt-2">Type</h6>
            </Col>
            <Col>
              <Form.Group controlId="formType">
                <Form.Select
                  ref={typeRef}
                  defaultValue={props.data.activeTicket.type}
                  aria-label="type"
                >
                  {props.data.activeTicket.type == "Bug" ? (
                    <option value="Bug" selected>
                      Bug
                    </option>
                  ) : (
                    <option value="Bug">Bug</option>
                  )}
                  {props.data.activeTicket.type == "Improvement" ? (
                    <option value="Improvement" selected>
                      Improvement
                    </option>
                  ) : (
                    <option value="Improvement">Improvement</option>
                  )}
                  {props.data.activeTicket.type == "Task" ? (
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
              <h6 className="mt-2">Priority</h6>
            </Col>
            <Col>
              <Form.Group controlId="formPriority">
                <Form.Select ref={priorityRef} aria-label="priority">
                  {props.data.activeTicket.priority == "Low" ? (
                    <option value="Low" selected>
                      Low
                    </option>
                  ) : (
                    <option value="Low">Low</option>
                  )}
                  {props.data.activeTicket.priority == "Medium" ? (
                    <option value="Medium" selected>
                      Medium
                    </option>
                  ) : (
                    <option value="Medium">Medium</option>
                  )}
                  {props.data.activeTicket.priority == "High" ? (
                    <option value="High" selected>
                      High
                    </option>
                  ) : (
                    <option value="High">High</option>
                  )}
                  {props.data.activeTicket.priority == "Highest" ? (
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
