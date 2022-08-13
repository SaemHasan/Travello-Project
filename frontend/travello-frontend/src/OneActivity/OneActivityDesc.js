import "../App.css";
import { OneActivityData } from "./OneActivity-data";
import React, { useEffect, useState } from "react";
import "./OneActivityDesc.css";
import OneActivityAPI from "./OneActivityAPI";
import {Link} from "@mui/material";
import pic from "../images/homepage.jpg";





function OneActivityDesc() {

    const [sortlist, setSortList] = useState(false);
    const [oneActivity, setOneActivity] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [dataList, set_dataList] = useState([]);
    const [list, setList] = useState([]);
    const [sortedlist, setSortedList] = useState([]);

    useEffect(() => {
        const activity = JSON.parse(localStorage.getItem("activity"));
        const api_path = "http://127.0.0.1:8000";

        if (activity !== null) {
            console.log("activity is not null");
            setOneActivity(activity);
            setName(activity.activity_name);
            setDescription(activity.short_description);
            setImgsrc(api_path + activity.image);
        }
    }, []);
  // const [onePlace, setOnePlace] = useState([]);
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [imgsrc, setImgsrc] = useState("");
  //
  //
  // useEffect(() => {
  //
  //   const p = JSON.parse(localStorage.getItem("place"));
  //   const api_path = "http://127.0.0.1:8000";
  //
  //   if (p !== null) {
  //     console.log("p is not null");
  //     setOnePlace(p);
  //     setName(p.name);
  //     setDescription(p.short_description);
  //     setImgsrc(api_path + p.image);
  //     // OnePlaceAPI.updateImgPath(p.image);
  //   }
  //
  //   const spot = JSON.parse(localStorage.getItem("spot"));
  //   if (spot !== null) {
  //     console.log("spot is not null");
  //     //console.log(spot);
  //     setOnePlace(spot);
  //     setName(spot.name);
  //     setDescription(spot.short_description);
  //     setImgsrc(api_path + spot.image);
  //   }
  //
  //   const explore_place = JSON.parse(localStorage.getItem("explore_place"));
  //   if (explore_place !== null) {
  //     //console.log("explore_place is not null");
  //     //console.log(exploreSpot);
  //     //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
  //     let my_place = []
  //     {explore_place.map((r) => (
  //         my_place.push({id: r.place_id, name: r.name, short_description : r.short_description, image: r.image,})
  //     ))};
  //     //console.log(my_place);
  //     //console.log(spot);
  //     //console.log(my_place[0].id);
  //     setOnePlace(my_place[0]);
  //     setName(my_place[0].name);
  //     setDescription(my_place[0].short_description);
  //     setImgsrc(api_path + String(my_place[0].image));
  //
  //   } else {
  //     console.log("null found");
  //   }
  //
  //
  //   const exploreSpot = JSON.parse(localStorage.getItem("explore_spot"));
  //   if (exploreSpot !== null) {
  //     //console.log("spot is not null");
  //     //console.log(exploreSpot);
  //     //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
  //     let my_spot = []
  //     {exploreSpot.map((r) => (
  //         my_spot.push({id: r.spot_id, name: r.name, short_description : r.short_description, image: r.image,})
  //     ))};
  //     //console.log(my_spot);
  //     //console.log(spot);
  //     setOnePlace(my_spot[0]);
  //     setName(my_spot[0].name);
  //     setDescription(my_spot[0].short_description);
  //     setImgsrc(api_path + String(my_spot[0].image));
  //
  //   } else {
  //     console.log("null found");
  //   }
  //
  //   const food = JSON.parse(localStorage.getItem("food"));
  //   if (food !== null) {
  //     console.log("food is not null");
  //     setOnePlace(food);
  //     setName(food.food_name);
  //     setDescription(food.short_description);
  //     setImgsrc(api_path + food.image);
  //   }
  // }, []);
  //
  // let hotelimg = OnePlaceData[1].image;
  // let foodimg = OnePlaceData[2].image;
  // let activityimg = OnePlaceData[3].image;

  return (




    <div>
      {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
      <div>
        <img
          className="img-fluid mainImage"
          src={pic}
          alt="Responsive image"
          width={"100%"}
        />
      </div>
      {/*<div className="row">*/}
      {/*  <div className="column" style={{ backgroundColor: "#bbb" }}>*/}
      {/*    <Link href="/Comparison" onClick={() => localStorage.setItem("load_category", JSON.stringify("place"))} >*/}
      {/*      <img*/}
      {/*      className="my_image"*/}
      {/*      src={hotelimg}*/}
      {/*      height={"50"}*/}
      {/*      alt={"hotel"}*/}
      {/*    />*/}
      {/*          </Link>*/}
      {/*    <img*/}
      {/*      className="my_image"*/}
      {/*      src={hotelimg}*/}
      {/*      height={"50"}*/}
      {/*      alt={"hotel"}*/}
      {/*    />*/}
      {/*    /!*<h2>Column 1</h2>*!/*/}
      {/*    /!*<p>Some text..</p>*!/*/}
      {/*  </div>*/}
      {/*  <div className="column" style={{ backgroundColor: "#bbb" }}>*/}
      {/*    <Link href="/Comparison" onClick={() => localStorage.setItem("load_category", JSON.stringify("food"))} >*/}
      {/*          <img className="my_image" src={foodimg} height={"50"} alt={"food"} />*/}
      {/*          </Link>*/}

      {/*    /!*<h2>Column 2</h2>*!/*/}
      {/*    /!*<p>Some text..</p>*!/*/}
      {/*  </div>*/}
      {/*  <div className="column" style={{ backgroundColor: "#bbb" }}>*/}
      {/*    <Link href="/Comparison" onClick={() => localStorage.setItem("load_category", JSON.stringify("activity"))}>*/}
      {/*    <img*/}
      {/*      className="my_image"*/}
      {/*      src={activityimg}*/}
      {/*      height={"50"}*/}
      {/*      alt={"activity"}*/}
      {/*    />*/}
      {/*    </Link>*/}

      {/*    /!*<h2>Column 3</h2>*!/*/}
      {/*    /!*<p>Some text..</p>*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px" }}
      >
        <h2>
          <b>
            <u>abcd</u>
          </b>
        </h2>
      </div>
      <div>
        <p style={{ marginLeft: "10px" }}>blah blah blah</p>
      </div>
    </div>
  );
}

export default OneActivityDesc;
