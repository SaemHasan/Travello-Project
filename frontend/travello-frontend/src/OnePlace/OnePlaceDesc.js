import "../App.css";
import { OnePlaceData } from "./OnePlace-data";
import React, { useEffect, useState } from "react";
import "./OnePlaceDesc.css";
import OnePlaceAPI from "./OnePlaceAPI";

function OnePlaceDesc() {
  const [onePlace, setOnePlace] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("place"));
    if (p !== null) {
      const frontend_img_path = "/assets/place/";
      console.log("p is not null");
      setOnePlace(p);
      setName(p.name);
      setDescription(p.short_description);
      setImgsrc(frontend_img_path + p.image);
      // OnePlaceAPI.updateImgPath(p.image);
    }

    const spot = JSON.parse(localStorage.getItem("spot"));
    if (spot !== null) {
      const frontend_img_path = "/assets/spot/";
      console.log("spot is not null");
      setOnePlace(spot);
      setName(spot.name);
      setDescription(spot.short_description);
      setImgsrc(frontend_img_path + spot.image);
    }

    const food = JSON.parse(localStorage.getItem("food"));
    if (food !== null) {
      const frontend_img_path = "/assets/food/";
      console.log("food is not null");
      setOnePlace(food);
      setName(food.food_name);
      setDescription(food.short_description);
      setImgsrc(frontend_img_path + food.image);
    }
  }, []);

  let hotelimg = OnePlaceData[1].image;
  let foodimg = OnePlaceData[2].image;
  let activityimg = OnePlaceData[3].image;

  return (
    <div>
      {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
      <div>
        <img src={imgsrc} alt="place_image" width={"100%"} />
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
          <img
            className="my_image"
            src={activityimg}
            height={"50"}
            alt={"activity"}
          />
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
