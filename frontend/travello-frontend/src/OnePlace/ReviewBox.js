import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import APIService from "../APIService";
import OnePlaceAPI from "./OnePlaceAPI";
import { TextField } from "@mui/material";
import { Form } from "react-bootstrap";

function ReviewBox(props) {
  // console.log(props.name);
  const [review, setReview] = React.useState("");
  const [user, setUser] = React.useState("");
  const [showPlaceReview, setShowPlaceReview] = React.useState(false);
  const [showReviewBox, setShowReviewBox] = React.useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      // console.log("token is not null");
      setShowReviewBox(true);
      APIService.getUserObject(token).then(async (data) => {
        console.log(data);
        await setUser(data);
      });
    }
    const p = JSON.parse(localStorage.getItem("place"));
    const spot = JSON.parse(localStorage.getItem("spot"));
    if (p || spot) {
      setShowPlaceReview(true);
    }
    else{
      console.log("no place or spot");
    }
  }, []);

  const submitBtn = () => {
    // console.log(user);
    console.log("here");

    const p = JSON.parse(localStorage.getItem("place"));
    if (p) {
      // console.log(p);
      const type = "review_places";
      OnePlaceAPI.addReview(
        {
          desc: review,
          user: user.username,
          place: p.place_id,
        },
        type
      ).then((res) => {
        console.log(res);
      });
    }
    const spot = JSON.parse(localStorage.getItem("spot"));
    if (spot) {
      const type = "review_spots";
      OnePlaceAPI.addReview(
        {
          desc: review,
          user: user.username,
          spot: spot.spot_id,
        },
        type
      ).then((res) => {
        console.log(res);
      });
    }
    window.location.reload(false);
  };
  if (showReviewBox) {
    return (
      <div>
        {showPlaceReview && (
          <div className="form">
            {/*<h1>Review Here: </h1>*/}
            <div className="form-body">
              <TextField
                id="review"
                label="Add Review"
                multiline
                rows={4}
                defaultValue={review}
                variant="filled"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            <Button onClick={submitBtn} type="submit">
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ReviewBox;
