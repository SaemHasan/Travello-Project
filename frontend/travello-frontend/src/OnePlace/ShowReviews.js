import React, { useEffect, useState } from "react";
import OnePlaceAPI from "./OnePlaceAPI";
import APIService from "../APIService";

function ShowReviews() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState("");
  const [place, setPlace] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    APIService.getUserObject(token).then(async (data) => {
      await setUser(data);
    });

    const p = JSON.parse(localStorage.getItem("place"));
    setPlace(p);

    // console.log(user);
    console.log(p.place_id);

    OnePlaceAPI.getReviews().then(async (data) => {
      // console.log(data);
      console.log("here dshajid");
      console.log(data);
      await setReviews(data);
    });

    // console.log("details");
    // console.log(reviews);
    // console.log(user);
    // console.log(place);

    // reviews.map((review) => {
    //   if (review.user != user.id && review.place != place.place_id) {
    //     console.log("here i am");
    //     reviews.pop(review);
    //   }
    // });
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews &&
        reviews.map((article) => {
          return (
            <div key={article.review_id}>
              {/*<h2>{article.title}</h2>*/}

              <p>{article.user}</p>
              <p>{article.desc}</p>
            </div>
          );
        })}
    </div>
  );
}

export default ShowReviews;
