import {useEffect, useState} from "react";
import {Link} from "@mui/material";
import RecommendationAPI from "./RecommendationAPI";
import ShowSpots from "./ShowSpots";

export default function Recommendation() {
    const [spotRecommendationByVisit, setSpotRecommendationByVisit] = useState([]);
    const [spotRecommendationByInterests, setSpotRecommendationByInterests] = useState([]);
    const [userVisitedSpots, setUserVisitedSpots] = useState([]);
    const [userInterestObjs, setUserInterestObjs] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [show, setShow] = useState(false);


    async function getUniqueSpots() {
        // console.log("getUniqueSpots : ", spotRecommendationByInterests);
        for (let i = 0; i < spotRecommendationByInterests.length; i++) {
            for (let j = 0; j < spotRecommendationByVisit.length; j++) {
                if (spotRecommendationByInterests[i].spot_id === spotRecommendationByVisit[j].spot_id) {
                    // console.log("here in if");
                    spotRecommendationByInterests.splice(i, 1);
                    i = 0;
                    break;
                }
            }
        }
        await setSpotRecommendationByInterests(spotRecommendationByInterests);
        console.log("getUniqueSpots finish: ", spotRecommendationByInterests);

    }


    useEffect(
        () => {
            async function getData(token) {
                let res = await RecommendationAPI.getRecommendationByUserVisitedSpot(token);
                await setSpotRecommendationByVisit(res);
                // console.log("res ",res);
                res = await RecommendationAPI.getUserVisitedSpots(token);
                await setUserVisitedSpots(res);
                // console.log("res ",res);
                res = await RecommendationAPI.getUserInterests(token);
                await setUserInterestObjs(res);
                console.log("res ", res);
                if (res.length !== 0) {
                    let interests = [];
                    for (let i =0;i<res.length;i++){
                        interests.push(res[i].interest);
                    }
                    // console.log("interests : ",interests);
                    res = await RecommendationAPI.getRecommendatioByUserInterest(token, interests);
                    await setSpotRecommendationByInterests(res);
                    // console.log("res ",res);
                    if(spotRecommendationByVisit.length !== 0 && res.length !== 0){
                        await getUniqueSpots();
                    }
                }

            }

            async function fetchUser() {
                const t = JSON.parse(localStorage.getItem("token"));
                if (t) {
                    await getData(t).then(setShow(true));
                }
            }

            fetchUser().then();
        }, []);


    if (show) {
        return (
            <div className="container">
                <h1 className="center_title">Recommendation</h1>
                <div className="row">
                    {
                        spotRecommendationByVisit.length !== 0 ?
                            <div>
                                <h2 className="center_title">Recommendation by visited spots</h2>
                                <ShowSpots data={spotRecommendationByVisit}/>
                            </div>
                            : <div>You didn't provide any visited place info.</div>
                    }
                </div>
                <div className="row" style={{paddingTop: 50}}>
                    {
                        spotRecommendationByInterests.length !== 0 ?
                            <>
                                <h2 className="center_title">Recommendation by interests</h2>
                                <ShowSpots data={spotRecommendationByInterests}/> </>
                            :
                            <p>You didn't provide your interests.</p>
                    }
                </div>

            </div>
        )
    } else {
        return (
            <div className="container center">
                <h1>PLEASE LOG IN FIRST.</h1>
                <h4>You can <Link href="login"> log in</Link> or <Link href="Registration">Register</Link>.</h4>
            </div>
        )
    }
}