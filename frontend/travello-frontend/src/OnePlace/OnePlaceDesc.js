import "../App.css";
import { OnePlaceData } from "./OnePlace-data";
import React, { useEffect, useState } from "react";
import "./OnePlaceDesc.css";
import OnePlaceAPI from "./OnePlaceAPI";
import {Link} from "@mui/material";

function OnePlaceDesc() {
  const [onePlace, setOnePlace] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("place"));
    const api_path = "http://127.0.0.1:8000";

    if (p !== null) {
      console.log("p is not null");
      setOnePlace(p);
      setName(p.name);
      setDescription(p.short_description);
      setImgsrc(api_path + p.image);
      // OnePlaceAPI.updateImgPath(p.image);
    }

    const spot = JSON.parse(localStorage.getItem("spot"));
    if (spot !== null) {
      console.log("spot is not null");
      setOnePlace(spot);
      setName(spot.name);
      setDescription(spot.short_description);
      setImgsrc(api_path + spot.image);
    }

    const food = JSON.parse(localStorage.getItem("food"));
    if (food !== null) {
      console.log("food is not null");
      setOnePlace(food);
      setName(food.food_name);
      setDescription(food.short_description);
      setImgsrc(api_path + food.image);
    }
  }, []);

  let hotelimg = OnePlaceData[1].image;
  let foodimg = OnePlaceData[2].image;
  let activityimg = OnePlaceData[3].image;

  return (
    <div>
      {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
      <div>
        <img
          className="img-fluid mainImage"
          src={imgsrc}
          alt="Responsive image"
          width={"100%"}
        />
      </div>
      <div className="row">
        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <img
            className="my_image"
            src={hotelimg}
            height={"50"}
            alt={"hotel"}
          />
          {/*<h2>Column 1</h2>*/}
          {/*<p>Some text..</p>*/}
        </div>
        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <img className="my_image" src={foodimg} height={"50"} alt={"food"} />
          {/*<h2>Column 2</h2>*/}
          {/*<p>Some text..</p>*/}
        </div>
        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <Link href="/Comparison" style={{ color: "white" }}>
          <img
            className="my_image"
            src={activityimg}
            height={"50"}
            alt={"activity"}
          />
          </Link>

          {/*<h2>Column 3</h2>*/}
          {/*<p>Some text..</p>*/}
        </div>
      </div>
      <div
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px" }}
      >
        <h2>
          <b>
            <u>{name}</u>
          </b>
        </h2>
      </div>
      <div>
        <p style={{ marginLeft: "10px" }}>{description}</p>
      </div>
    </div>
  );
}

export default OnePlaceDesc;
