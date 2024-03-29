import Card from "react-bootstrap/Card";
import { Grid, Link } from "@mui/material";
import { useState } from "react";
import { typeArray } from "./AddSpotTypeData";
import AddSpotModal from "./AddSpotModal";
import AddPlaceModal from "./AddPlaceModal";
import AddPlaceRatingModal from "./AddPlaceRatingInfoModal";
import AddSpotRatingModal from "./AddSpotRatingModal";
import AddSpotTypeTableModal from "./AddSpotTypeTableModal";
import AddSpotTypeModal from "./AddSpotTypeModal";
import AddSpotFoodModal from "./AddSpotFoodModal";
import AddSpotActivityModal from "./AddSpotActivityModal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function SpotGridShow() {
  const [type, setType] = useState([]);
  const [placeClick, setPlaceClick] = useState(false);
  const [spotClick, setSpotClick] = useState(false);
  const [placeRatingClick, setPlaceRatingClick] = useState(false);
  const [spotRatingClick, setSpotRatingClick] = useState(false);
  const [spotTypeTableClick, setSpotTypeTableClick] = useState(false);
  const [spotTypeClick, setSpotTypeClick] = useState(false);
  const [spotFoodClick, setSpotFoodClick] = useState(false);
  const [spotActivityClick, setSpotActivityClick] = useState(false);

  let navigate = useNavigate();

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);

    if (type.type === "Place") {
      await setPlaceClick(true);
    }
    if (type.type === "Spot") {
      await setSpotClick(true);
    }
    if (type.type === "Place RatingInfo") {
      await setPlaceRatingClick(true);
    }
    if (type.type === "Spot RatingInfo") {
      await setSpotRatingClick(true);
    }
    if (type.type === "Spot Type Table") {
      await setSpotTypeTableClick(true);
    }
    if (type.type === "Spot Type") {
      await setSpotTypeClick(true);
    }
    if (type.type === "Spot Food") {
      await setSpotFoodClick(true);
    }
    if (type.type === "Spot Activity") {
      await setSpotActivityClick(true);
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
    if (type.type === "Place RatingInfo") {
      setPlaceRatingClick(false);
    }
    if (type.type === "Spot RatingInfo") {
      setSpotRatingClick(false);
    }
    if (type.type === "Spot Type Table") {
      setSpotTypeTableClick(false);
    }
    if (type.type === "Spot Type") {
      setSpotTypeClick(false);
    }
    if (type.type === "Spot Food") {
      setSpotFoodClick(false);
    }
    if (type.type === "Spot Activity") {
      setSpotActivityClick(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Spot</h1>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {typeArray.map((card, idx) => (
            <Grid item xs={2} sm={4} md={4} key={idx}>
              <Card>
                <Card.Header>
                  <Button
                    variant="info"
                    onClick={() => navigate(card.navigate)}
                  >
                    {card.type}
                  </Button>
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

        {placeRatingClick && (
          <AddPlaceRatingModal
            type={type}
            handleClose={handleClose}
            show={placeRatingClick}
          />
        )}
        {spotRatingClick && (
          <AddSpotRatingModal
            type={type}
            handleClose={handleClose}
            show={spotRatingClick}
          />
        )}

        {spotTypeTableClick && (
          <AddSpotTypeTableModal
            type={type}
            handleClose={handleClose}
            show={spotTypeTableClick}
          />
        )}

        {spotTypeClick && (
          <AddSpotTypeModal
            type={type}
            handleClose={handleClose}
            show={spotTypeClick}
          />
        )}

        {spotFoodClick && (
          <AddSpotFoodModal
            type={type}
            handleClose={handleClose}
            show={spotFoodClick}
          />
        )}

        {spotActivityClick && (
          <AddSpotActivityModal
            type={type}
            handleClose={handleClose}
            show={spotActivityClick}
          />
        )}
      </div>
    </div>
  );
}

export default SpotGridShow;
