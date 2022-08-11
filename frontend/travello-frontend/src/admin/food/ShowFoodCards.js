import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "@mui/material";
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

function FoodGridShow() {
  const [type, setType] = useState([]);
  const [foodClick, setFoodClick] = useState(false);
  const [restaurantClick, setRestaurantClick] = useState(false);
  const [foodRestaurantClick, setFoodRestaurantClick] = useState(false);
  const [foodPriceInfoClick, setFoodPriceInfoClick] = useState(false);
  const [foodRatingInfoClick, setFoodRatingInfoClick] = useState(false);
  const [foodTypeTableClick, setFoodTypeTableClick] = useState(false);
  const [foodTypeClick, setFoodTypeClick] = useState(false);

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
        <Row xs={1} md={3} className="g-4">
          {typeArray.map((card, idx) => (
            <Col key={idx}>
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
            </Col>
          ))}
        </Row>
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
