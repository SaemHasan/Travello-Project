import "../App.css";
import { OnePlaceData } from "./OnePlace-data";
import React, { useEffect, useState } from "react";
import "./OnePlaceDesc.css";
import OnePlaceAPI from "./OnePlaceAPI";

function OnePlaceDesc() {
  const [onePlace, setOnePlace] = useState([]);
  const frontend_img_path = "/assets/place/";

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("place"));
    console.log(p);
    if (p !== null) {
      console.log("p is not null");
      setOnePlace(p);
      // console.log(p.image);
    }
  }, []);

  // let placename = OnePlaceData[0].heading;
  // let imgsrc = OnePlaceData[0].image;
  // let desc = OnePlaceData[0].desc;
  let hotelimg = OnePlaceData[1].image;
  let foodimg = OnePlaceData[2].image;
  let activityimg = OnePlaceData[3].image;

  return (
    <div>
      {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
      <div>
        <img
          src={frontend_img_path + onePlace.image}
          alt="place_image"
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
            <u>{onePlace.name}</u>
          </b>
        </h2>
      </div>
      <div>
        <p style={{ marginLeft: "10px" }}>{onePlace.short_description}</p>
      </div>
    </div>
  );
}

export default OnePlaceDesc;
