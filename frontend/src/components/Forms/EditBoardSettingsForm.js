import react, { useContext, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import DataContext from "../store/data-context";
import { axiosInstance, url } from "../store/api";

// use state to present 2 forms: 1 for editing the name/prefix/organization and another for editing the columns

const EditBoardSettingsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  console.log(props);

  //changed these to reference activeBoardData
  //see if this updates state after saving changes
  //if not, try a new function to set the state with  useEffect
  //on the fetchAndUpdate function
  const [boardName, setBoardName] = useState(props.data.activeBoardData.name);
  const [prefix, setPrefix] = useState(props.data.activeBoardData.prefix);
  


  const submitHandler = async (e) => {
    e.preventDefault();

    //try with new exported axios later
    await axiosInstance
      .patch(
        `${url}/board/${props.data.activeBoard.id}/update/`,
        {
          name: boardName,
          prefix: prefix,
        },
        {
          headers: { Authorization: "Bearer " + authCtx.access },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          props.closeEditBoardModal();
          props.api.fetchUpdatedBoardData(props.data.activeBoardData);
        } else {
          console.log(res);
          console.log("bad request");
        }
      });
  };

  return (
    <Form onSubmit={submitHandler} id="editBoardForm">
      <Row>
        <Col></Col>
        <Col xl={8} lg={8} md={10} sm={10} xs={12}>
          <Form.Group controlId="formName" className="mt-2">
            <Form.Label>Board title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoardData.name}
              onChange={(e) => {
                setBoardName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPrefix" className="mt-2">
            <Form.Label>Board Prefix</Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.data.activeBoard.prefix}
              onChange={(e) => {
                setPrefix(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
    </Form>
  );
};

export default EditBoardSettingsForm;
