import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { typeArray } from "./AddTypeData.js";
import { Link } from "@mui/material";
import AddActivityModal from "./activity/AddActivityModal";
import { render } from "react-dom";
import { useState } from "react";
import AddPlaceModal from "./spot/AddPlaceModal";
import AddSpotModal from "./spot/AddSpotModal";
import AddHotelModal from "./hotel/AddHotelModal";
import AddFoodModal from "./food/AddFoodModal";

function GridShow() {
  const [type, setType] = useState([]);
  const [activityClick, setActivityClick] = useState(false);
  const [placeClick, setPlaceClick] = useState(false);
  const [spotClick, setSpotClick] = useState(false);
  const [hotelClick, setHotelClick] = useState(false);
  const [foodClick, setFoodClick] = useState(false);

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Activity") {
      // console.log("activity");
      await setActivityClick(true);
    }
    if (type.type === "Place") {
      await setPlaceClick(true);
    }
    if (type.type === "Spot") {
      await setSpotClick(true);
    }
    if (type.type === "Hotel") {
      await setHotelClick(true);
    }
    if (type.type === "Food") {
      await setFoodClick(true);
    }
    // console.log("activity click : ", activityClick);
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Activity") {
      setActivityClick(false);
    }
    if (type.type === "Place") {
      setPlaceClick(false);
    }
    if (type.type === "Spot") {
      setSpotClick(false);
    }
    if (type.type === "Hotel") {
      setHotelClick(false);
    }
    if (type.type === "Food") {
      setFoodClick(false);
    }
    // console.log("activity click in close : ", activityClick);
  };

  return (
    <div>
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

      <div>
        {activityClick && (
          <AddActivityModal
            type={type}
            handleClose={handleClose}
            show={activityClick}
          />
        )}

        {placeClick && (
          <AddPlaceModal
            type={type}
            handleClose={handleClose}
            show={placeClick}
          />
        )}

        {spotClick && (
          <AddSpotModal
            type={type}
            handleClose={handleClose}
            show={spotClick}
          />
        )}

        {hotelClick && (
          <AddHotelModal
            type={type}
            handleClose={handleClose}
            show={hotelClick}
          />
        )}

        {foodClick && (
          <AddFoodModal
            type={type}
            handleClose={handleClose}
            show={foodClick}
          />
        )}
      </div>
    </div>
  );
}

export default GridShow;
