import { useState } from "react";
import { Collapse, Button, ButtonGroup } from "react-bootstrap";
import SpotGridShow from "./spot/ShowSpotCards";
import ActivityGridShow from "./activity/ShowActivityCards";
import FoodGridShow from "./food/ShowFoodCards";
import HotelGridShow from "./hotel/ShowHotelCards";

export default function AddInfo() {
  const [showPlace, setShowPlace] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showHotel, setShowHotel] = useState(false);

  const handlePlace = () => {
    setShowPlace(!showPlace);
    setShowActivity(false);
    setShowFood(false);
    setShowHotel(false);
  };
  const handleActivity = () => {
    setShowActivity(!showActivity);
    setShowPlace(false);
    setShowFood(false);
    setShowHotel(false);
  };
  const handleFood = () => {
    setShowFood(!showFood);
    setShowPlace(false);
    setShowActivity(false);
    setShowHotel(false);
  };
  const handleHotel = () => {
    setShowHotel(!showHotel);
    setShowPlace(false);
    setShowActivity(false);
    setShowFood(false);
  };

  return (
    <div className="container">
      <div className="justify-content-center center">
        <ButtonGroup size="lg" className="mb-2">
          <Button variant="success" onClick={handlePlace}>
            Add Place
          </Button>
          <Button variant="success" onClick={handleActivity}>
            Add Activity
          </Button>
          <Button variant="success" onClick={handleFood}>
            Add Food
          </Button>
          <Button variant="success" onClick={handleHotel}>
            Add Hotel
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Collapse in={showPlace}>
          <div>
            <SpotGridShow />
          </div>
        </Collapse>

        <Collapse in={showActivity}>
          <div>
            <ActivityGridShow />
          </div>
        </Collapse>

        <Collapse in={showFood}>
          <div>
            <FoodGridShow />
          </div>
        </Collapse>

        <Collapse in={showHotel}>
          <div>
            <HotelGridShow />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
