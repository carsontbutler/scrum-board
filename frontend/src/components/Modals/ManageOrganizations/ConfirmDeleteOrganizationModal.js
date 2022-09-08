import react, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Modal.css";
import "../../Inbox.css";
import { axiosInstance, url } from "../../store/api";
import AuthContext from "../../store/auth-context";
import { AppWindow } from "phosphor-react";

const ConfirmDeleteOrganizationModal = (props) => {
  const authCtx = useContext(AuthContext);
  const [deleteOrgError, setDeleteOrgError] = useState("");

  const submitDeleteOrganizationHandler = async (e) => {
    e.preventDefault();
    await axiosInstance
      .delete(
        `${url}/organization/${props.data.activeOrganization.id}/delete/`,
        { headers: { Authorization: "Bearer " + authCtx.access } }
      )
      .then((res) => {
        if (res.status == 204) {
          axiosInstance
            .get(`/boards`, {
              headers: { Authorization: "Bearer " + authCtx.access },
            })
            .then((response) => {
              if (response.status === 200) {
                let newOrganizations = response.data.organizations;
                props.setData({
                  ...props.data,
                  organizations: newOrganizations,
                  activeOrganization: {},
                });
              }
            });
          props.setToastMessage("Organization deleted.");
          props.setShowToast(true);
          props.hideConfirmDeleteOrganizationModalHandler();
          window.location.reload();
        }
      })
      .catch(() => {
        props.hideConfirmDeleteOrganizationModalHandler();
        setDeleteOrgError("Something went wrong.");
      });
  };

  return (
    <Modal
      size={"sm"}
      centered
      show={props.showConfirmDeleteOrganizationModal}
      fullscreen={false}
      scrollable={true}
    >
      <Modal.Header
        closeButton
        onHide={props.hideConfirmDeleteOrganizationModalHandler}
        className="mx-3"
      >
        <Modal.Title>Delete organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-center">
          Are you sure you want to delete {props.data.activeOrganization.name}?
        </h6>
        <h6>All associated data will be removed.</h6>
        {deleteOrgError && <span>{deleteOrgError}</span>}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={submitDeleteOrganizationHandler}>
          Delete
        </Button>
        <div className="inbox-cancel-btn">
          <Button onClick={props.hideConfirmDeleteOrganizationModalHandler}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteOrganizationModal;
