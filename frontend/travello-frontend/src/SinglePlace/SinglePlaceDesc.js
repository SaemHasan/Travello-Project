import "../App.css";
import { SinglePlaceData } from "./SinglePlace-data";
import React, { useEffect, useState } from "react";
import "./SinglePlaceDesc.css";
import SinglePlaceAPI from "./SinglePlaceAPI";
import { Link } from "@mui/material";
import SliderSpotSinglePage from "./SliderSpotSinglePage";

function SinglePlaceDesc() {
  const [onePlace, setOnePlace] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  useEffect(() => {
    const api_path = "http://127.0.0.1:8000";


        const explore_place = JSON.parse(localStorage.getItem("explore_place"));
    if (explore_place !== null) {
      //console.log("explore_place is not null");
      //console.log(exploreSpot);
      //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
      let my_place = [];
      {
        explore_place.map((r) =>
          my_place.push({
            id: r.place_id.place_id,
            name: r.name,
            short_description: r.short_description,
            image: r.image,
          })
        );
      }
      //console.log(my_place);
      //console.log(spot);
      //console.log(my_place[0].id);
      setOnePlace(my_place[0]);
      setName(my_place[0].name);
      setDescription(my_place[0].short_description);
      setImgsrc(api_path + String(my_place[0].image));
    } else {
      console.log("explore place null found");
    }
    const p = JSON.parse(localStorage.getItem("place"));

    if (p !== null) {
      console.log("p is not null");
      setOnePlace(p);
      setName(p.name);
      setDescription(p.short_description);
      setImgsrc(api_path + p.image);
      // OnePlaceAPI.updateImgPath(p.image);
    }

  }, []);



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
        <div> <h1 style={{textAlign:"center", marginTop:"20px", marginBottom:"20px"}}><b>Famous Spots of {name}</b></h1></div>
      <div style={{ marginLeft: "-50px" }}>
        <SliderSpotSinglePage />
      </div>
    </div>
  );
}

export default SinglePlaceDesc;
