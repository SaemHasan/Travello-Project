import "../App.css";
import "./OneHotel.css"
import React, { useEffect, useState } from "react";
import {Link} from "@mui/material";
import OneHotelAPI from "./OneHotelAPI";
import List from "../Comparison/components/Home/List";
import {render} from 'react-dom';

function OneHotel() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const api_path = "http://127.0.0.1:8000";
    let hotel_atb_response = null
    let atb_list = []
      const [dataList, set_dataList] = useState([]);
  const [list, setList] = useState(dataList);
  const [room_list, setroom_list] = useState([]);



    useEffect(() => {
        async function fetchData() {


            const hotel_id = JSON.parse(localStorage.getItem("hotel_id"));
            const hotel_response = await OneHotelAPI.getOneHotel(hotel_id);
            const room_response = await OneHotelAPI.getRooms(hotel_id);
            hotel_atb_response = await OneHotelAPI.getOneHotelAttribute(hotel_id);
                {hotel_atb_response.map((r) => (
                    dataList.push({atb_id:r.id, name:r.name})
                ))};
            {room_response.map((r) => (
                    room_list.push({room_id:r.id,room_no:r.room_no,room_type:r.room_type,room_atb:r.room_atb})
                ))};
          setList(dataList);
          console.log(room_list);
            //console.log(atb_list)
            console.log(room_response)


            setName(hotel_response[0].name)
            setImgsrc(api_path + String(hotel_response[0].image));
            //console.log(hotel_response)
            //console.log(hotel_atb_response)
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
                    style={{marginTop: "20px", marginBottom: "20px", marginLeft: "10px"}}
                >
                    <h2>
                        <b>
                            <u>{name}</u>
                        </b>
                    </h2>
                </div>
                <div>
                    <p style={{marginLeft: "10px"}}>{description}</p>
                </div>

        <div>
            {list.map(l =>{
                return(
                    <div key={l.atb_id}>
                        <div
        style={{
          boxShadow: '1px 2px 9px #F4AAB9',
          margin: '1em',
          padding: '.5em',
        }}
      >
                           <p><b>{l.name}</b></p>

      </div>

                    </div>
                )
            })}
        </div>
                <div>
                    {room_list.map(r =>{
                return(
                    <div key={r.room_id}>
                        <div>
                           <p><b>{r.room_type}</b></p>
                                            <div>
                    {r.room_atb.map(rb =>{
                return(
                    <div key={rb.id}>
                        <div>
                           <p><b>{rb.name}</b></p>
                           <p><b>{rb.value}</b></p>

      </div></div>
                )})}
        </div>
                           {/*<p><b>{r.room_atb}</b></p>*/}
      </div></div>
                )})}
        </div>



            </div>
        );

}

export default OneHotel;
