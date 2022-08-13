import "../App.css";
import React, { useEffect, useState } from "react";
import {Link} from "@mui/material";
import OneHotelAPI from "./OneHotelAPI";

function OneHotel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");
  const api_path = "http://127.0.0.1:8000";


      useEffect(() => {
      async function fetchData() {


      const hotel_id = JSON.parse(localStorage.getItem("hotel_id"));
      const hotel_response = await OneHotelAPI.getOneHotel(hotel_id);
      setName(hotel_response[0].name)
          setImgsrc(api_path + String(hotel_response[0].image));
      console.log(hotel_response)
          setDescription(hotel_response[0].short_description)


      }
      fetchData();

    }, []);


  return (


    <div className="body">
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
    </div>
  );
}

export default OneHotel;
