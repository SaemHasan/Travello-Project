import Card from "react-bootstrap/Card";
import { Grid, Link } from "@mui/material";
import { useState } from "react";
import { typeArray } from "./AddActivityTypeData";
import AddActivityModal from "./AddActivityModal";
import AddActivityTypeModal from "./AddActivityTypeModal";
import AddAgencyModal from "./AddAgencyModal";
import AddActivityAgencyModal from "./AddActivity_AgencyModal";
import AddActivityPriceModal from "./AddActivityPriceInfoModal";
import AddActivityRatingModal from "./AddActivityRatingModal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function ActivityGridShow() {
  const [type, setType] = useState([]);
  const [activityClick, setActivityClick] = useState(false);
  const [activityTypeClick, setActivityTypeClick] = useState(false);
  const [agencyClick, setAgencyClick] = useState(false);
  const [activityAgencyClick, setActivityAgencyClick] = useState(false);
  const [activityPriceClick, setActivityPriceClick] = useState(false);
  const [activityRatingCheck, setActivityRatingCheck] = useState(false);

  let navigate = useNavigate();

  const handleClick = async (type) => {
    // console.log(type);
    setType(type);
    if (type.type === "Activity") {
      await setActivityClick(true);
    }
    if (type.type === "Activity Type") {
      await setActivityTypeClick(true);
    }
    if (type.type === "Agency") {
      await setAgencyClick(true);
    }

    if (type.type === "Activity Agency") {
      await setActivityAgencyClick(true);
    }
    if (type.type === "Activity Priceinfo") {
      await setActivityPriceClick(true);
    }
    if (type.type === "Activity Ratinginfo") {
      await setActivityRatingCheck(true);
    }
    // console.log("activity click : ", activityClick);
  };

  const handleClose = (type) => {
    setType([]);
    if (type.type === "Activity") {
      setActivityClick(false);
    }
    if (type.type === "Activity Type") {
      setActivityTypeClick(false);
    }
    if (type.type === "Agency") {
      setAgencyClick(false);
    }
    if (type.type === "Activity Agency") {
      setActivityAgencyClick(false);
    }
    if (type.type === "Activity Priceinfo") {
      setActivityPriceClick(false);
    }

    if (type.type === "Activity Ratinginfo") {
      setActivityRatingCheck(false);
    }
    // console.log("activity click in close : ", activityClick);
  };

  return (
    <div>
      <div>
        <h1>Activity</h1>
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
        {activityClick && (
          <AddActivityModal
            type={type}
            handleClose={handleClose}
            show={activityClick}
          />
        )}

        {activityTypeClick && (
          <AddActivityTypeModal
            type={type}
            handleClose={handleClose}
            show={activityTypeClick}
          />
        )}

        {agencyClick && (
          <AddAgencyModal
            type={type}
            handleClose={handleClose}
            show={agencyClick}
          />
        )}

        {activityAgencyClick && (
          <AddActivityAgencyModal
            type={type}
            handleClose={handleClose}
            show={activityAgencyClick}
          />
        )}

        {activityPriceClick && (
          <AddActivityPriceModal
            type={type}
            handleClose={handleClose}
            show={activityPriceClick}
          />
        )}

        {activityRatingCheck && (
          <AddActivityRatingModal
            type={type}
            handleClose={handleClose}
            show={activityRatingCheck}
          />
        )}
      </div>
    </div>
  );
}

export default ActivityGridShow;
