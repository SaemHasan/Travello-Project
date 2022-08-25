import {useEffect, useState} from "react";
import APIService from "../APIService";
import {Link} from "@mui/material";
import RecommendationAPI from "./RecommendationAPI";
import AdminAPI from "../admin/AdminAPI";

export default function Recommendation(){
    const [spotRecommendationByVisit, setSpotRecommendationByVisit] = useState([]);
    const [spotRecommendationByInterests, setSpotRecommendationByInterests] = useState([]);
    const [userVisitedSpots, setUserVisitedSpots] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [placeResult, setPlaceResult] = useState([]);
    const [spotResult, setSpotResult] = useState([]);
    const [show, setShow] = useState(false);

    async function getData(token) {
        let res = await RecommendationAPI.getRecommendationByUserVisitedSpot(token);
        setSpotRecommendationByVisit(res);
        // console.log("res ",res);
        res = await RecommendationAPI.getUserVisitedSpots(token);
        setUserVisitedSpots(res);
        // console.log("res ",res);
        res = await RecommendationAPI.getUserInterests(token);
        // console.log("res ",res);
        if(res.length !== 0) {
            await res.map(async (r) => {
                await setUserInterests([...userInterests, r.interest]);
            })
            // console.log("interests : ",userInterests);
             res = await RecommendationAPI.getRecommendatioByUserInterest(token, userInterests);
            await setSpotRecommendationByInterests(res);
            // console.log("res ",res);
        }

    }

    useEffect(
         () => {
             async function fetchUser() {
                 const t = JSON.parse(localStorage.getItem("token"));
                 if (t) {
                     await setShow(true);
                     await getData(t);
                 }
             }

             fetchUser().then();
         }, []);

    if(show) {
        return (
            <div>
                <h1>Recommendation</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quidem.
                </p>
            </div>
        )
    }
    else{
       return(
           <div className="container center">
               <h1>PLEASE LOG IN FIRST.</h1>
               <h4>You can <Link href="login"> log in</Link> or <Link href="Registration">Register</Link>.</h4>
           </div>
       )
    }
}