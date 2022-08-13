import React, { useEffect, useState } from "react";
import OnePlaceAPI from "./OnePlaceAPI";
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@material-ui/core/Typography";

function ShowReviews() {
  const [reviews, setReviews] = useState([]);
  const [place, setPlace] = useState("");
  const [result, setResult] = useState("");
  const user_image = "/assets/user.jpeg";

  const p = JSON.parse(localStorage.getItem("place"));

  useEffect(() => {
    setPlace(p);
    // console.log("place :", p);

    const type = "review_places";

    // OnePlaceAPI.getReviews().then(async (data) => {
    //   // console.log(data);
    //   await setReviews(data);
    // });

    OnePlaceAPI.getReviewbyPlaceID(p.place_id, type).then(async (res) => {
      await setReviews(res);
    });
  }, []);

  return (
    <div>
      {reviews.length && <h1>Reviews</h1>}

      <Grid container spacing={3}>
        {reviews &&
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
}

export default ShowReviews;
