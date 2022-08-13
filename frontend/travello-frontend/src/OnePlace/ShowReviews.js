import React, { useEffect, useState } from "react";
import OnePlaceAPI from "./OnePlaceAPI";
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@material-ui/core/Typography";

function ShowReviews() {
  const [reviews, setReviews] = useState([]);
  const user_image = "/assets/user.jpeg";
  const [showPlaceReview, setShowPlaceReview] = React.useState(false);

  const place = JSON.parse(localStorage.getItem("place"));
  const spot = JSON.parse(localStorage.getItem("spot"));
  useEffect(() => {
    if (place) {
      setShowPlaceReview(true);
      const type = "review_places";
      OnePlaceAPI.getReviewbyPlaceID(place.place_id, type).then(async (res) => {
        await setReviews(res);
      });
    }
    if (spot) {
      setShowPlaceReview(true);
      const type = "review_spots";
      OnePlaceAPI.getReviewbyPlaceID(spot.spot_id, type).then(async (res) => {
        await setReviews(res);
      });
    }
  }, []);

  if (showPlaceReview && reviews.length > 0) {
    return (
      <div>
        {reviews.length && <h1>Reviews</h1>}

        <Grid container spacing={3}>
          {reviews.length &&
            reviews.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.user}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <h4>No Reviews</h4>
      </div>
    );
  }
}

export default ShowReviews;
