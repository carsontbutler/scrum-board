import React, { useRef, useContext } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";
import { axiosInstance, url } from "../store/api";
import "../Modals/Modal.css";

const CreateTicketForm = (props) => {
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

  console.log("PROPS ", props);

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
      .post(
        `${url}/create-ticket/`,
        {
          organization: props.data.activeOrganization.id,
          board: props.data.activeBoardData.id,
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
          props.closeCreateTicketModalHandler();
          props.api.fetchUpdatedBoardData(props.data.activeBoardData);
          props.showToastHandler(`Ticket created successfully`);
        } else {
          console.log("handle error"); //! handle this properly with a message
        }
      });
  };
  return (
    <Form onSubmit={submitHandler} id="createTicketForm">
      <Row className="justify-content-center">
        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
          <div className="form-content mt-2">
            <Form.Group controlId="formTitle">
              <h6>Title</h6>
              <Form.Control as="textarea" ref={titleRef} />
            </Form.Group>
          </div>

          <div className="form-content mt-2">
            <Form.Group controlId="formDescription">
              <h6>Description</h6>
              <Form.Control as="textarea" ref={descriptionRef} />
            </Form.Group>
          </div>

          <div className="form-content mt-2">
            <Form.Group controlId="formReproSteps">
              <h6>Reproduction Steps</h6>
              <Form.Control as="textarea" ref={reproStepsRef} />
            </Form.Group>
          </div>
          <div className="form-content mt-2">
            <Form.Group controlId="formAcceptanceCriteria">
            <h6>Acceptance Criteria</h6>
              <Form.Control as="textarea" ref={acceptanceCriteriaRef} />
            </Form.Group>
          </div>
        </Col>
        <Col
          className="text-center right-col form-content"
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
                  {props.data.activeOrganization.users.map((user) => (
                    <option value={user.id}>{user.username}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col>
              <h6 className="mt-2">Column</h6>
            </Col>
            <Col>
              <Form.Group controlId="formColumn">
                <Form.Select ref={columnRef}>
                  {props.data.activeBoardData.columns.map((column) => (
                    <option value={column.id}>{column.name}</option>
                  ))}
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
                <Form.Select ref={typeRef} aria-label="type">
                  <option value="Bug">Bug</option>
                  <option value="Improvement">Improvement</option>
                  <option value="Task">Task</option>
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
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Highest">Highest</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateTicketForm;
