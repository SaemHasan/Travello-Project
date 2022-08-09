import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { typeArray } from "./AddTypeData.js";
import { Link } from "@mui/material";
import AddActivityModal from "./AddActivityModal";
import { render } from "react-dom";
import { useState } from "react";

function GridShow() {
  const [type, setType] = useState([]);
  const [activityClick, setActivityClick] = useState(false);
  const [placeClick, setPlaceClick] = useState(false);
  const [spotClick, setSpotClick] = useState(false);
  const [hotelClick, setHotelClick] = useState(false);

  const handleClick = (type) => {
    console.log(type);
    setType(type);
    if (type === "Activity") {
      setActivityClick(true);
    }
    if (type === "Place") {
      setPlaceClick(true);
    }
    if (type === "Spot") {
      setSpotClick(true);
    }
    if (type === "Hotel") {
      setHotelClick(true);
    }
  };

  const handleClose = (type) => {
    setType([]);
    if (type === "Activity") {
      setActivityClick(false);
    }
    if (type === "Place") {
      setPlaceClick(false);
    }
    if (type === "Spot") {
      setSpotClick(false);
    }
    if (type === "Hotel") {
      setHotelClick(false);
    }
  };

  return (
    <div>
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
  );
}

export default GridShow;
