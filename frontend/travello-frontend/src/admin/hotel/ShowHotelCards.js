import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Grid, Link } from "@mui/material";
import { useState } from "react";
import AddHotelModal from "./AddHotelModal";
import { typeArray } from "./AddHotelTypeData";
import AddHotelAttributeModal from "./AddHotelAttributeModal";
import AddHotelAttributeRelationModal from "./AddHotelAttributeRelationModal";
import AddRoomModal from "./AddRoomModal";
import AddRoomAttributeModal from "./AddRoomAttributeModal";
import AddRoomAttributeRelationModal from "./AddRoomAttributeRelationModal";
import AddRoomPriceInfoModal from "./AddRoomPriceInfoModal";
import AddHotelRatingInfoModal from "./AddHotelRatingInfoModal";
import Button from "react-bootstrap/Button";

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
  const [hotelRatingInfoClick, setHotelRatingInfoClick] = useState(false);

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
    if (type.type === "Hotel Rating Info") {
      await setHotelRatingInfoClick(true);
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
    if (type.type === "Hotel Rating Info") {
      setHotelRatingInfoClick(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Hotel</h1>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {typeArray.map((card, idx) => (
            <Grid item xs={2} sm={4} md={4} key={idx}>
              <Card>
                <Card.Header>
                  <Button variant="info">{card.type}</Button>
                </Card.Header>
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
                    <Card.Title>
                      <Button variant="success">{card.title}</Button>
                    </Card.Title>
                    {/*<Card.Subtitle>{card.description}</Card.Subtitle>*/}
                  </Card.Body>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
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
        {roomClick && (
          <AddRoomModal
            type={type}
            handleClose={handleClose}
            show={roomClick}
          />
        )}
        {roomAttributeClick && (
          <AddRoomAttributeModal
            type={type}
            handleClose={handleClose}
            show={roomAttributeClick}
          />
        )}
        {roomAttributeRelationClick && (
          <AddRoomAttributeRelationModal
            type={type}
            handleClose={handleClose}
            show={roomAttributeRelationClick}
          />
        )}
        {roomPriceInfoClick && (
          <AddRoomPriceInfoModal
            type={type}
            handleClose={handleClose}
            show={roomPriceInfoClick}
          />
        )}
        {hotelRatingInfoClick && (
          <AddHotelRatingInfoModal
            type={type}
            handleClose={handleClose}
            show={hotelRatingInfoClick}
          />
        )}
      </div>
    </div>
  );
}

export default HotelGridShow;
