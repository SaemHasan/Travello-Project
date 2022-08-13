import "../App.css";
import React, { useEffect, useState } from "react";
import {Link} from "@mui/material";
import ComparisonAPI from "../Comparison/ComparisonAPI";






function OneHotel() {

  const [onePlace, setOnePlace] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");


      useEffect(() => {
      async function fetchData() {


      const hotel_id = JSON.parse(localStorage.getItem("hotel_id"));
      const hotel_response = await ComparisonAPI.getAllActivity(hotel_id);
      console.log(hotel_response)


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
