import "../App.css";
import {SinglePlaceData} from "./SinglePlace-data";
import React, {useEffect, useState} from "react";
import "./SinglePlaceDesc.css";
import SinglePlaceAPI from "./SinglePlaceAPI";
import {Link} from "@mui/material";
import SliderSpotSinglePage from "./SliderSpotSinglePage";
import APIService from "../APIService";
import {ShowDoughnut} from "../recommendation/ShowDounut";

function SinglePlaceDesc() {
    const [onePlace, setOnePlace] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [visitedCount, setVisitedCount] = useState([]);
    const [show, setShow] = useState(false);

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

            async function getPlaceSpotPercentage() {
                const t = JSON.parse(localStorage.getItem("token"));
                if (t) {
                    console.log("token is not null");
                    const user = await APIService.getUserObject(t);
                    const res = await SinglePlaceAPI.getPlaceSpotPercentage(p.place_id, user.id);
                    const count = [res["visited"], res["not_visited"]];
                    count[0] = count[0] / (res["visited"] + res["not_visited"]) * 100;
                    count[1] = count[1] / (res["visited"] + res["not_visited"]) * 100;
                    await setVisitedCount(count);
                    console.log(count);
                    await setShow(true);
                }
            }

            getPlaceSpotPercentage();
            setOnePlace(p);
            setName(p.name);
            setDescription(p.short_description);
            if (p.image.includes("http://127.0.0.1:8000")) {
                setImgsrc(p.image);
            } else {
                setImgsrc(api_path + p.image);
            }
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
            <div><h1 style={{textAlign: "center", marginTop: "20px", marginBottom: "20px"}}><b>Famous Spots
                of {name}</b></h1></div>
            <div style={{marginLeft: "-50px"}}>
                <SliderSpotSinglePage/>
            </div>
            <>
                { show &&
                    <div className="col-6 center">
                        <ShowDoughnut data={{labels: ["Visited", "Not Visited"], count: visitedCount}}
                                      title={"Your Visited Spots in Percentage"}/>
                    </div>
                }
            </>


        </div>
    );
}

export default SinglePlaceDesc;
