import react from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import "../Modals/Modal.css";
import EditBoardSettingsForm from "./EditBoardSettingsForm";
import EditBoardColumnsForm from "./EditBoardColumnsForm";

const EditBoardForm = (props) => {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <Row>
            {props.showSettings ? (
              <div className="active">
                <Button size="lg" className="text-white shadow-none">
                  Board
                </Button>
              </div>
            ) : (
              <div className="inactive">
                <Button
                  onClick={props.showSettingsHandler}
                  size="lg"
                  className="shadow-none"
                >
                  Board
                </Button>
              </div>
            )}
          </Row>
        </Col>
        <Col>
          <Row>
            {props.showColumns ? (
              <div className="active">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-white shadow-none"
                >
                  Columns
                </Button>
              </div>
            ) : (
              <div className="inactive">
                <Button
                  onClick={props.showColumnsHandler}
                  size="lg"
                  variant="outline-secondary"
                  className="shadow-none"
                >
                  Columns
                </Button>
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="p-3 m-auto">
        {props.showSettings && !props.showColumns && (
          <EditBoardSettingsForm
            api={props.api}
            data={props.data}
            setData={props.setData}
            closeEditBoardModal={props.closeEditBoardModal}
          />
        )}
        {props.showColumns && !props.showSettings && (
          <EditBoardColumnsForm
            api={props.api}
            data={props.data}
            setData={props.setData}
            closeEditBoardModal={props.closeEditBoardModal}
          />
        )}
      </Row>
    </Container>
  );
};

export default EditBoardForm;
