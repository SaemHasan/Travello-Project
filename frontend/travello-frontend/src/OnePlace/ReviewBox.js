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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      console.log("token is not null");
      APIService.getUserObject(token).then(async (data) => {
        console.log(data);
        await setUser(data);
      });
    }
  }, []);

  const submitBtn = () => {
    // console.log(user);
    console.log("here");
    const p = JSON.parse(localStorage.getItem("place"));
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

    window.location.reload(false);
  };

  return (
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
  );
}

export default ReviewBox;
