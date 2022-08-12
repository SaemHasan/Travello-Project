import { useState } from "react";
import { Collapse } from "react-bootstrap";
import SpotGridShow from "./spot/ShowSpotCards";
import ActivityGridShow from "./activity/ShowActivityCards";
import FoodGridShow from "./food/ShowFoodCards";
import HotelGridShow from "./hotel/ShowHotelCards";
import { Button, ButtonGroup } from "@mui/material";

export default function AddInfo() {
  const [showPlace, setShowPlace] = useState(true);
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={handlePlace}>Add Place</Button>
          <Button onClick={handleActivity}>Add Activity</Button>
          <Button onClick={handleFood}>Add Food</Button>
          <Button onClick={handleHotel}>Add Hotel</Button>
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
