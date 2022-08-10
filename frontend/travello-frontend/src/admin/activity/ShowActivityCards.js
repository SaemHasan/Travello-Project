import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "@mui/material";
import { useState } from "react";
import { typeArray } from "./AddActivityTypeData";
import AddActivityModal from "./AddActivityModal";
import AddActivityTypeModal from "./AddActivityTypeModal";
import AddAgencyModal from "./AddAgencyModal";

function ActivityGridShow() {
  const [type, setType] = useState([]);
  const [activityClick, setActivityClick] = useState(false);
  const [activityTypeClick, setActivityTypeClick] = useState(false);
  const [agencyClick, setAgencyClick] = useState(false);

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Activity") {
      await setActivityClick(true);
    }
    if (type.type === "Activity Type") {
      await setActivityTypeClick(true);
    }
    if (type.type === "Agency") {
      await setAgencyClick(true);
    }
    // console.log("activity click : ", activityClick);
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Activity") {
      setActivityClick(false);
    }
    if (type.type === "Activity Type") {
      setActivityTypeClick(false);
    }
    if (type.type === "Agency") {
      setAgencyClick(false);
    }
    // console.log("activity click in close : ", activityClick);
  };

  return (
    <div>
      <div>
        <h1>Activity</h1>
        <Row xs={1} md={3} className="g-4">
          {typeArray.map((card, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Header>{card.type}</Card.Header>
                <Card.Img
                  variant="bottom"
                  src={card.image}
                  width="100px"
                  height="250px"
                />
                <Link
                  underline="hover"
                  onClick={(e) => handleClick(card)}
                  style={{ color: "black" }}
                >
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Subtitle>{card.description}</Card.Subtitle>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div>
        {activityClick && (
          <AddActivityModal
            type={type}
            handleClose={handleClose}
            show={activityClick}
          />
        )}

        {activityTypeClick && (
          <AddActivityTypeModal
            type={type}
            handleClose={handleClose}
            show={activityTypeClick}
          />
        )}

        {agencyClick && (
          <AddAgencyModal
            type={type}
            handleClose={handleClose}
            show={agencyClick}
          />
        )}
      </div>
    </div>
  );
}

export default ActivityGridShow;
