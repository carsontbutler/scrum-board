import react, { useRef, useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import DataContext from "../store/data-context";
import "./EditBoardForm.css";
import EditBoardSettingsForm from "./EditBoardSettingsForm";
import EditBoardColumnsForm from "./EditBoardColumnsForm";

const EditBoardForm = (props) => {
  const [showSettings, setShowSettings] = useState(true);
  const [showColumns, setShowColumns] = useState(false);

  const showSettingsHandler = () => {
    setShowSettings(true);
    setShowColumns(false);
  };

  const showColumnsHandler = () => {
    setShowColumns(true);
    setShowSettings(false);
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <Row>
            {showSettings ? (
              <Button
                size="lg"
                variant="secondary"
                className="text-white shadow-none"
              >
                Board
              </Button>
            ) : (
              <Button
                onClick={showSettingsHandler}
                size="lg"
                variant="outline-secondary"
                className="shadow-none"
              >
                Board
              </Button>
            )}
          </Row>
        </Col>
        <Col>
          <Row>
            {showColumns ? (
              <Button
                size="lg"
                variant="secondary"
                className="text-white shadow-none"
              >
                Columns
              </Button>
            ) : (
              <Button
                onClick={showColumnsHandler}
                size="lg"
                variant="outline-secondary"
                className="shadow-none"
              >
                Columns
              </Button>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="p-3 m-auto">
        {showSettings && !showColumns && (
          <EditBoardSettingsForm api={props.api} data={props.data} closeEditBoardModal={props.closeEditBoardModal}/>
        )}
        {showColumns && !showSettings && (
          <EditBoardColumnsForm api={props.api} data={props.data} closeEditBoardModal={props.closeEditBoardModal}/>
        )}
      </Row>
    </Container>
  );
};

export default EditBoardForm;
