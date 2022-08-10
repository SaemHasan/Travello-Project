import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "@mui/material";
import { useState } from "react";
import { typeArray } from "./AddSpotTypeData";
import AddSpotModal from "./AddSpotModal";
import AddPlaceModal from "./AddPlaceModal";

function SpotGridShow() {
  const [type, setType] = useState([]);
  const [placeClick, setPlaceClick] = useState(false);
  const [spotClick, setSpotClick] = useState(false);

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);

    if (type.type === "Place") {
      await setPlaceClick(true);
    }
    if (type.type === "Spot") {
      await setSpotClick(true);
    }
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Place") {
      setPlaceClick(false);
    }
    if (type.type === "Spot") {
      setSpotClick(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Spot</h1>
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
      </div>
    </div>
  );
}

export default SpotGridShow;
