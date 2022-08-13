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
      <div style={{ marginLeft: "-50px" }}>
        <SliderSpotSinglePage />
      </div>
    </div>
  );
}

export default SinglePlaceDesc;
