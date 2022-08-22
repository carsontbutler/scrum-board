import react, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import "../Modal.css";
import "../../Inbox.css";
import { axiosInstance, url } from "../../store/api";
import AuthContext from "../../store/auth-context";

const ConfirmDeleteMemberModal = (props) => {
  const authCtx = useContext(AuthContext);

  const submitRemoveMemberHandler = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(
        `${url}/organization/remove-member/`,
        {
          id: props.data.activeOrganization.id,
          members: [props.memberToRemove.id],
        },
        { headers: { Authorization: "Bearer " + authCtx.access } }
      )
      .then((res) => {
        if (res.status == 200) {
          props.setData({ ...props.data, activeOrganization: res.data });
          props.setToastMessage("Member removed successfully.");
          props.setShowToast(true);
          props.hideConfirmDeleteModalHandler();
        } else {
          props.hideConfirmDeleteModalHandler();
          props.setMemberError(
            "Something went wrong. Please try again."
          );
        }
      })
      .catch(() => {
        props.hideConfirmDeleteModalHandler();
        props.setMemberError("Something went wrong. Please try again.");
      });
  };

  return (
    <Modal
      size={"sm"}
      centered
      show={props.showConfirmDeleteModal}
      fullscreen={false}
      scrollable={true}
    >
      <Modal.Header
        closeButton
        onHide={props.hideConfirmDeleteModalHandler}
        className="mx-3"
      >
        <Modal.Title>Remove user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-center">
          Remove {props.memberToRemove.username} from{" "}
          {props.data.activeOrganization.name}?
        </h6>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={submitRemoveMemberHandler}>
          Remove
        </Button>
        <div className="inbox-cancel-btn">
          <Button onClick={props.hideConfirmDeleteModalHandler}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteMemberModal;
