import "../App.css";
import {OnePlaceData} from "./OnePlace-data";
import React, {useEffect, useState} from "react";
import "./OnePlaceDesc.css";
import OnePlaceAPI from "./OnePlaceAPI";
import {Link} from "@mui/material";
import {ShowBarChart} from "../home/ShowBarChart";
import Button from "react-bootstrap/Button";
import APIService from "../APIService";
import RecommendationAPI from "../recommendation/RecommendationAPI";

function OnePlaceDesc() {
    const [onePlace, setOnePlace] = useState([]);
    const [userID, setUser] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [datesOfVisit, setDatesOfVisit] = useState([]);
    const [count, setCount] = useState([]);
    const [misc, setMisc] = useState([]);
    const [miscLength, setmiscLength] = useState(false);
    const [disable, setDisable] = React.useState(false);
    let [getAgencyCor, setgetAgencyCor] = React.useState([]);
    //const [recohotel, setRecohotel] = React.useState("");
    let recohotel = "";
    const [reco_id, setreco_id] = React.useState();
    const [is_reco_hotel, setisreco_hotel] = React.useState(false);

    async function updateVisitCount(spot_id) {
        await OnePlaceAPI.updateVisitCount(spot_id);
    }
    function handleClick(id) {
        console.log(id)
        localStorage.setItem("hotel_id", JSON.stringify(id));
        window.location.href = "/Onehotel";
    }

    async function getVisitHistory(spot_id) {
        const res = await OnePlaceAPI.getVisitHistoryOfASpot(spot_id);
        // console.log(res);
        const dates = res.map(item => item.date);
        const count = res.map(item => item.count);
        await setDatesOfVisit(dates);
        await setCount(count);
        console.log(dates);
        console.log(count);
    }

    const Visited_btn = async () => {
        setDisable(true);
        if (userID !== "") {
            // console.log("spot id : ", onePlace.spot_id)
            // console.log("user id : ", userID)
            const uploadData = new FormData();
            uploadData.append("spot_id", onePlace.spot_id);
            uploadData.append("user_id", userID);
            const res = await APIService.postToDB(uploadData, "user_spots");
            console.log(res)
        }
    };

    useEffect(() => {

        const api_path = "http://127.0.0.1:8000";
        const exploreSpot = JSON.parse(localStorage.getItem("explore_spot"));
        if (exploreSpot !== null) {


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

            async function GetSpotAdvantages(spot_id) {


                setmiscLength(false);
                //console.log("i am in this function");
                while (misc.length !== 0) {
                    console.log("rakin");
                    misc.pop();
                }
                for (let m = 0; m < misc.length; m++) {
                    //console.log("kopppp");
                    misc[m] = []
                }
                //console.log(spot_id);
                const response = await OnePlaceAPI.getHotelMIscofSpot(spot_id);
                //console.log(response);
                let templist = [];

                {
                    response.map((r) => (
                        //console.log(r.activity_id)
                        //activity_id_list.push(r.activity_id)
                        templist.push(r)
                    ))
                }
                let uniqueArray = []
                for (let k = 0; k < templist.length; k++) {
                    if (uniqueArray.indexOf(templist[k]) === -1) {
                        uniqueArray.push(templist[k]);
                    }
                }
                setMisc(uniqueArray);
                if (misc.length !== 0)
                    setmiscLength(true);
                localStorage.removeItem("explore_spot");


                const activity_list = JSON.parse(localStorage.getItem("activity_list"));
                const hotel_list_byID = await OnePlaceAPI.getHotelIDCor(spot_id);

                const activity_list_byID = await OnePlaceAPI.getActivityIdCor(spot_id, activity_list[0].activity_list);
                setgetAgencyCor(await OnePlaceAPI.getAgencyCor(activity_list_byID, hotel_list_byID));
                console.log(hotel_list_byID)
                console.log("i am in explore spot");
                console.log(getAgencyCor.name);
                //setRecohotel(getAgencyCor.name)
                recohotel = getAgencyCor.name
                console.log(recohotel)
                if(recohotel !== "")
                {
                    console.log("in print")
                    console.log(recohotel)
                    setisreco_hotel(true);
                    setreco_id(getAgencyCor.hotel_id);
                    console.log(getAgencyCor.hotel_id);
                    recohotel = getAgencyCor.name
                    //setRecohotel(getAgencyCor.name)
                }


            }

            GetSpotAdvantages(my_spot[0].id);
            //console.log(templist);
            //setMisc(templist);
            //console.log(misc);
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
        if (p === null && explore_pArr !== null) {
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
            setmiscLength(false);
            updateVisitCount(spot.spot_id);
            getVisitHistory(spot.spot_id);
            console.log("spot is not null");
            //console.log(spot);
            setOnePlace(spot);
            setName(spot.name);
            setDescription(spot.short_description);
            if (!spot.image.includes("http://127.0.0.1:8000")) {
                setImgsrc(api_path + spot.image);
            } else {
                setImgsrc(spot.image);
            }

            async function getUserId() {
                const token = JSON.parse(localStorage.getItem("token"))
                if (token) {
                    const user = await APIService.getUserObject(token)
                    await setUser(user.id)
                    console.log(user)
                    const visited_spots = await RecommendationAPI.getUserVisitedSpots(token);
                    if (visited_spots.length > 0) {
                        for (let i = 0; i < visited_spots.length; i++) {
                            if (visited_spots[i].spot_id === spot.spot_id) {
                                setDisable(true);
                            }
                        }
                    }

                } else {
                    setDisable(true)
                }


            }


            async function GetSpotAdvantages(spot_id) {
                // console.log("i am in that function");
                while (misc.length !== 0) {
                    // console.log("rakin");
                    misc.pop();
                }
                for (let m = 0; m < misc.length; m++) {
                    // console.log("kopppp");
                    misc[m] = []
                }
                const response = await OnePlaceAPI.getHotelMIscofSpot(spot_id);
                //console.log(response);
                let templist = [];

                {
                    response.map((r) => (
                        //console.log(r.activity_id)
                        //activity_id_list.push(r.activity_id)
                        misc.push(r)
                    ))
                }
                if (misc.length !== 0)
                    setmiscLength(true);
                //localStorage.removeItem("explore_spot");
            }

            getUserId().then();
            GetSpotAdvantages(spot.spot_id);

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
            <div className="row" style={{paddingLeft: "10px", paddingRight: "10px"}}>
                <div className="column" style={{backgroundColor: "#bbb"}}>
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
                        <br/>
                        <b><u>Hotels</u></b>
                    </Link>


                </div>
                <div className="column" style={{backgroundColor: "#bbb"}}>
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
                        <br/>
                        <b><u>Foods</u></b>
                    </Link>

                    {/*<h2>Column 2</h2>*/}
                    {/*<p>Some text..</p>*/}
                </div>
                <div className="column" style={{backgroundColor: "#bbb"}}>
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
                        <br/>
                        <b><u>Activities</u></b>
                    </Link>

                    {/*<h2>Column 3</h2>*/}
                    {/*<p>Some text..</p>*/}
                </div>
            </div>

            <div className='parent_oneplace'>
                <div className='child_oneplace'><h2>
                    <b>
                        <u>{name}</u>
                    </b>
                </h2></div>
                <div className='child_oneplace'>
                    <Button disabled={disable} onClick={() => {
                        Visited_btn()
                    }}>
                        Visited
                    </Button>
                </div>
            </div>


            <div>
                <p style={{marginLeft: "10px"}}>{description}</p>
            </div>
            {miscLength === true && (
            <div style={{marginBottom: "40px"}}>
                <u><h3 style={{marginLeft: "10px"}}>From {name}</h3></u>
                {
                      misc.map((atv,key)=>{
                          return(
                                <b><p style={{color:"#000000", marginLeft: "20px", marginTop: "20px",}}>{atv.misc_name} is {atv.distance} Km away</p></b>
                          )
                      })
                  }
            </div>
                )}

            {is_reco_hotel === true && (
            <div>
                <u><h3 style={{marginLeft: "10px"}}>Recommended Hotel</h3></u>

                    <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => handleClick(getAgencyCor.hotel_id)}

                //href=
              >
                    <h3 style={{ marginLeft:"20px", color:"blue"}}>{getAgencyCor.name}</h3>
                    </Link>

            </div>
                )}

            <div className="col-6 center">
                <ShowBarChart title={"Visits of last few days"} labels={datesOfVisit} data={count}/>
            </div>

        </div>
    );
}

export default OnePlaceDesc;
