import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "@mui/material";
import { useState } from "react";
import AddHotelModal from "./AddHotelModal";
import { typeArray } from "./AddHotelTypeData";

function HotelGridShow() {
  const [type, setType] = useState([]);
  const [hotelClick, setHotelClick] = useState(false);

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Hotel") {
      // console.log("activity");
      await setHotelClick(true);
    }
    // console.log("activity click : ", activityClick);
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Hotel") {
      setHotelClick(false);
    }
    // console.log("activity click in close : ", activityClick);
  };

  return (
    <div>
      <div>
        <h1>Hotel</h1>
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
        {hotelClick && (
          <AddHotelModal
            type={type}
            handleClose={handleClose}
            show={hotelClick}
          />
        )}
      </div>
    </div>
  );
}

export default HotelGridShow;
