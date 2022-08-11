import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "@mui/material";
import { useState } from "react";
import AddHotelModal from "./AddHotelModal";
import { typeArray } from "./AddHotelTypeData";
import AddHotelAttributeModal from "./AddHotelAttributeModal";
import AddHotelAttributeRelationModal from "./AddHotelAttributeRelationModal";

function HotelGridShow() {
  const [type, setType] = useState([]);
  const [hotelClick, setHotelClick] = useState(false);
  const [hotelAttributeClick, setHotelAttributeClick] = useState(false);
  const [hotelAttributeRelationClick, setHotelAttributeRelationClick] =
    useState(false);
  const [roomClick, setRoomClick] = useState(false);
  const [roomAttributeClick, setRoomAttributeClick] = useState(false);
  const [roomAttributeRelationClick, setRoomAttributeRelationClick] =
    useState(false);
  const [roomPriceInfoClick, setRoomPriceInfoClick] = useState(false);

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Hotel") {
      await setHotelClick(true);
    }
    if (type.type === "Hotel Attribute") {
      await setHotelAttributeClick(true);
    }
    if (type.type === "Hotel Attribute Relation") {
      await setHotelAttributeRelationClick(true);
    }
    if (type.type === "Room") {
      await setRoomClick(true);
    }
    if (type.type === "Room Attribute") {
      await setRoomAttributeClick(true);
    }
    if (type.type === "Room Attribute Relation") {
      await setRoomAttributeRelationClick(true);
    }
    if (type.type === "Room Price Info") {
      await setRoomPriceInfoClick(true);
    }
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Hotel") {
      setHotelClick(false);
    }
    if (type.type === "Hotel Attribute") {
      setHotelAttributeClick(false);
    }
    if (type.type === "Hotel Attribute Relation") {
      setHotelAttributeRelationClick(false);
    }
    if (type.type === "Room") {
      setRoomClick(false);
    }
    if (type.type === "Room Attribute") {
      setRoomAttributeClick(false);
    }
    if (type.type === "Room Attribute Relation") {
      setRoomAttributeRelationClick(false);
    }
    if (type.type === "Room Price Info") {
      setRoomPriceInfoClick(false);
    }
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
        {hotelAttributeClick && (
          <AddHotelAttributeModal
            type={type}
            handleClose={handleClose}
            show={hotelAttributeClick}
          />
        )}
        {hotelAttributeRelationClick && (
          <AddHotelAttributeRelationModal
            type={type}
            handleClose={handleClose}
            show={hotelAttributeRelationClick}
          />
        )}
      </div>
    </div>
  );
}

export default HotelGridShow;
