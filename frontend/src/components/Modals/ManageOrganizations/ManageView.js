import react, { useState, useContext, useEffect } from "react";
import { Button, Row, Container, Col, Table, Form } from "react-bootstrap";
import "../Modal.css";
import "../../Inbox.css";
import { axiosInstance, url } from "../../store/api";
import AuthContext from "../../store/auth-context";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ManageView = (props) => {
  const authCtx = useContext(AuthContext);
  const goBackHandler = () => {
    props.setView({ ...props.view, screen: "home" });
  };
  const [orgName, setOrgName] = useState(props.data.activeOrganization.name);
  const [memberToRemove, setMemberToRemove] = useState({});
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    props.api.getInitialData();
  }, []);

  const showConfirmDeleteModalHandler = (e) => {
    setMemberToRemove(
      props.data.activeOrganization.users.find((obj) => obj.id == e.target.id)
    );
    setShowConfirmDeleteModal(true);
  };

  const hideConfirmDeleteModalHandler = () => {
    setShowConfirmDeleteModal(false);
    setMemberToRemove("");
  };

  const submitNameChangeHandler = async (e) => {
    e.preventDefault();
    await axiosInstance
      .patch(
        `${url}/organization/${props.data.activeOrganization.id}/rename/`,
        { name: orgName },
        { headers: { Authorization: "Bearer " + authCtx.access } }
      )
      .then(async (res) => {
        console.log(res);
        if (res.status == 200) {
          props.setToastMessage("Updated successfully.");
          props.setShowToast(true);
          props.api.getInitialData();
          props.setData({
            ...props.data,
            activeOrganization: res.data.organization,
          });
        } else {
          props.setErrorMessage(
            "Something went wrong. Please try again later."
          );
        }
      });
  };

  return (
    <Container>
      <Row>
        <Col xl={3} lg={3} md={2} sm={2} xs={1} className="sidebar">
          <a onClick={goBackHandler} className="previous mx-2">
            &laquo; Return
          </a>
        </Col>
        <Col xl={6} lg={6} md={8} sm={8} xs={10}>
          <div className="form-content">
            <h6>Organization name</h6>
          </div>
          <Row className="edit-org">
            <Form onSubmit={submitNameChangeHandler} id="edit-org-form">
              <Row>
                <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={orgName}
                      onChange={(e) => {
                        setOrgName(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                  <div className="approve-btn">
                    <Button type="submit" form="edit-org-form">
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
            {props.errorMessage && (
              <h6 className="error-message">{props.errorMessage}</h6>
            )}
          </Row>
          <Row className="mt-5 form-content">
            <Table striped>
              <thead>
                <tr>
                  <th className="form-content">
                    <h6>Members</h6>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.data.activeOrganization.users
                  .filter(
                    (user) => user.id !== props.data.activeOrganization.owner
                  )
                  .map((user) => (
                    <tr>
                      <td>{user.username}</td>
                      <td className="remove-btn-cell" id={user.id}>
                        <Button
                          variant="danger"
                          id={user.id}
                          style={{ zIndex: "1000" }}
                          onClick={showConfirmDeleteModalHandler}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Row>
          <Col xl={3} lg={3} md={2} sm={2} xs={1}></Col>
        </Col>
        {errorMessage && (
          <h6 className="text-center error-message">{errorMessage}</h6>
        )}
      </Row>
      <ConfirmDeleteModal
        memberToRemove={memberToRemove}
        showConfirmDeleteModal={showConfirmDeleteModal}
        hideConfirmDeleteModalHandler={hideConfirmDeleteModalHandler}
        toastMessage={props.toastMessage}
        setToastMessage={props.setToastMessage}
        showToast={props.showToast}
        setShowToast={props.setShowToast}
        data={props.data}
        setData={props.setData}
        api={props.api}
        setErrorMessage={setErrorMessage}
      />
    </Container>
  );
};

export default ManageView;
