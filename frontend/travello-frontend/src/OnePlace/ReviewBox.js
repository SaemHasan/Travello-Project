import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import APIService from "../APIService";
import OnePlaceAPI from "./OnePlaceAPI";

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
    console.log(user);
    console.log("here");
    const p = JSON.parse(localStorage.getItem("place"));
    console.log(p);
    OnePlaceAPI.addReview({
      desc: review,
      user: user.id,
      place: p.place_id,
    });
  };

  return (
    <div className="form">
      <h1>Review Here: </h1>
      <div>
        <label className="form__label" htmlFor="review">
          Review
        </label>
        <input
          className="form__input"
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          id="review"
          placeholder="Review"
        />
      </div>

      <div className="footer">
        <Button onClick={submitBtn} type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ReviewBox;
