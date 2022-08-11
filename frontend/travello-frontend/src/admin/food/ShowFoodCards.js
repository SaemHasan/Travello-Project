import Card from "react-bootstrap/Card";
import { Grid, Link } from "@mui/material";
import { useState } from "react";
import AddFoodModal from "./AddFoodModal";
import { typeArray } from "./AddFoodTypeData";
import AddRestaurantModal from "./AddRestaurantModal";
import AddFoodRestaurantModal from "./AddFoodRestaurantModal";
import AddFoodPriceModal from "./AddFoodPriceInfoModal";
import AddFoodRatingModal from "./AddFoodRatingInfoModal";
import AddFoodTypeTableModal from "./AddFoodTypeTable";
import AddFoodTypeModal from "./AddFoodTypeModal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function FoodGridShow() {
  const [type, setType] = useState([]);
  const [foodClick, setFoodClick] = useState(false);
  const [restaurantClick, setRestaurantClick] = useState(false);
  const [foodRestaurantClick, setFoodRestaurantClick] = useState(false);
  const [foodPriceInfoClick, setFoodPriceInfoClick] = useState(false);
  const [foodRatingInfoClick, setFoodRatingInfoClick] = useState(false);
  const [foodTypeTableClick, setFoodTypeTableClick] = useState(false);
  const [foodTypeClick, setFoodTypeClick] = useState(false);
  let navigate = useNavigate();

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Food") {
      await setFoodClick(true);
    }

    if (type.type === "Restaurant") {
      await setRestaurantClick(true);
    }
    if (type.type === "Food Restaurant") {
      await setFoodRestaurantClick(true);
    }
    if (type.type === "Food Price Info") {
      await setFoodPriceInfoClick(true);
    }
    if (type.type === "Food Rating Info") {
      await setFoodRatingInfoClick(true);
    }
    if (type.type === "Food Type Table") {
      await setFoodTypeTableClick(true);
    }
    if (type.type === "Food Type Relation") {
      await setFoodTypeClick(true);
    }
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Food") {
      setFoodClick(false);
    }
    if (type.type === "Restaurant") {
      setRestaurantClick(false);
    }
    if (type.type === "Food Restaurant") {
      setFoodRestaurantClick(false);
    }
    if (type.type === "Food Price Info") {
      setFoodPriceInfoClick(false);
    }
    if (type.type === "Food Rating Info") {
      setFoodRatingInfoClick(false);
    }
    if (type.type === "Food Type Table") {
      setFoodTypeTableClick(false);
    }
    if (type.type === "Food Type Relation") {
      setFoodTypeClick(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Food</h1>
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
        {foodClick && (
          <AddFoodModal
            type={type}
            handleClose={handleClose}
            show={foodClick}
          />
        )}

        {restaurantClick && (
          <AddRestaurantModal
            type={type}
            handleClose={handleClose}
            show={restaurantClick}
          />
        )}
        {foodRestaurantClick && (
          <AddFoodRestaurantModal
            type={type}
            handleClose={handleClose}
            show={foodRestaurantClick}
          />
        )}
        {foodPriceInfoClick && (
          <AddFoodPriceModal
            type={type}
            handleClose={handleClose}
            show={foodPriceInfoClick}
          />
        )}
        {foodRatingInfoClick && (
          <AddFoodRatingModal
            type={type}
            handleClose={handleClose}
            show={foodRatingInfoClick}
          />
        )}
        {foodTypeTableClick && (
          <AddFoodTypeTableModal
            type={type}
            handleClose={handleClose}
            show={foodTypeTableClick}
          />
        )}
        {foodTypeClick && (
          <AddFoodTypeModal
            type={type}
            handleClose={handleClose}
            show={foodTypeClick}
          />
        )}
      </div>
    </div>
  );
}

export default FoodGridShow;
