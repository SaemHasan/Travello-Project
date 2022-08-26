import "../App.css";
import { OnePlaceData } from "./OnePlace-data";
import React, { useEffect, useState } from "react";
import "./OnePlaceDesc.css";
import OnePlaceAPI from "./OnePlaceAPI";
import { Link } from "@mui/material";

function OnePlaceDesc() {
  const [onePlace, setOnePlace] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  useEffect(() => {
    const api_path = "http://127.0.0.1:8000";
    // const explore_place = JSON.parse(localStorage.getItem("explore_place"));
    // if (explore_place !== null) {
    //   //console.log("explore_place is not null");
    //   console.log(explore_place);
    //   //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
    //   let my_place = [];
    //   {
    //     explore_place.map((r) =>
    //       my_place.push({
    //         id: r.place_id,
    //         name: r.name,
    //         short_description: r.short_description,
    //         image: r.image,
    //       })
    //     );
    //   }
    //   //console.log(my_place);
    //   //console.log(spot);
    //   //console.log(my_place[0].id);
    //   setOnePlace(my_place[0]);
    //   setName(my_place[0].name);
    //   setDescription(my_place[0].short_description);
    //   setImgsrc(api_path + String(my_place[0].image));
    //   console.log("explore place is not null");
    // } else {
    //   console.log("explore place null found");
    // }

    const exploreSpot = JSON.parse(localStorage.getItem("explore_spot"));
    if (exploreSpot !== null) {
      //console.log("spot is not null");
      //console.log(exploreSpot);
      //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
      // console.log("explore Spot: ",exploreSpot)
      let my_spot = [];
      {
        exploreSpot.map((r) =>
          my_spot.push({
            id: r.spot_id,
            name: r.name,
            short_description: r.short_description,
            image: r.image,
          })
        );
      }
      //console.log(my_spot);
      //console.log(spot);
      setOnePlace(my_spot[0]);
      setName(my_spot[0].name);
      setDescription(my_spot[0].short_description);
      setImgsrc(api_path + String(my_spot[0].image));
    } else {
      console.log("explore spot null found");
    }

    let p = JSON.parse(localStorage.getItem("place"));
    const explore_pArr = JSON.parse(localStorage.getItem("explore_place"));
    if(p === null && explore_pArr !== null ){
      p = explore_pArr[0];
      localStorage.setItem("place", JSON.stringify(p));
    }
    if (p !== null) {
      console.log("p is not null");
        console.log(p);
      setOnePlace(p);
      setName(p.name);
      setDescription(p.short_description);
      setImgsrc(api_path + p.image);
      // OnePlaceAPI.updateImgPath(p.image);
    }


    if (explore_pArr !== null) {
      console.log("explore_p is not null");
      // console.log(explore_pArr);
      const explore_p = explore_pArr[0]
      setOnePlace(explore_p);
      setName(explore_p.name);
      setDescription(explore_p.short_description);
      setImgsrc(api_path + explore_p.image);
    }

    const spot = JSON.parse(localStorage.getItem("spot"));
    if (spot !== null) {
      console.log("spot is not null");
      //console.log(spot);
      setOnePlace(spot);
      setName(spot.name);
      setDescription(spot.short_description);
      if(! spot.image.includes("http://127.0.0.1:8000")) {
        setImgsrc(api_path + spot.image);
      }
      else{
        setImgsrc(spot.image);
      }
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
      <div className="row" style={{paddingLeft:"10px", paddingRight:"10px"}}>
        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <Link
            href="/Comparison"
            onClick={() =>
              localStorage.setItem("load_category", JSON.stringify("place"))
            }
          >
            <img
              className="my_image"
              src={hotelimg}
              height={"50"}
              alt={"hotel"}
            />
          </Link>
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
          <Link
            href="/Comparison"
            onClick={() =>
              localStorage.setItem("load_category", JSON.stringify("food"))
            }
          >
            <img
              className="my_image"
              src={foodimg}
              height={"50"}
              alt={"food"}
            />
          </Link>

          {/*<h2>Column 2</h2>*/}
          {/*<p>Some text..</p>*/}
        </div>
        <div className="column" style={{ backgroundColor: "#bbb" }}>
          <Link
            href="/Comparison"
            onClick={() =>
              localStorage.setItem("load_category", JSON.stringify("activity"))
            }
          >
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
