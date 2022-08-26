import {useEffect, useState} from "react";
import {Link, Rating} from "@mui/material";
import RecommendationAPI from "./RecommendationAPI";
import ShowSpots from "./ShowSpots";
import {ShowDoughnut} from "./ShowDounut";
import {ShowBarChart} from "./ShowBarChart";
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Recommendation() {
    const [spotRecommendationByVisit, setSpotRecommendationByVisit] = useState([]);
    const [spotRecommendationByInterests, setSpotRecommendationByInterests] = useState([]);
    const [userVisitedSpots, setUserVisitedSpots] = useState([]);
    const [userInterestObjs, setUserInterestObjs] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [VisitedSpotsData, setVisitedSpotsData] = useState({});
    const [lastSevenDaysData, setLastSevenDaysData] = useState({});
    const [show, setShow] = useState(false);
    // const [foodOfVisitRecommendation, setFoodOfVisitRecommendation] = useState([]);
    // const [foodOfInterestRecommendation, setFoodOfInterestRecommendation] = useState([]);
    // const [activityOfVisitRecommendation, setActivityOfVisitRecommendation] = useState([]);
    // const [activityOfInterestRecommendation, setActivityOfInterestRecommendation] = useState([]);

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
        // console.log("here i am 3")
        // if (spotRecommendationByInterests.length !== 0) {
        //     console.log("here i am 3.1")
        //     let foodres = await getFoodsOfSpot(spotRecommendationByInterests);
        //     await setFoodOfInterestRecommendation(foodres);
        // }
        await setSpotRecommendationByInterests(spotRecommendationByInterests);
        // console.log("getUniqueSpots finish: ", spotRecommendationByInterests);

    }

    async function getTopVisitedSpots(t) {
        const res = await RecommendationAPI.getTopVisitedSpots(t);
        let labels = []
        let cnt = []
        let cnt_per = []
        for (let i = 0; i < res.length; i++) {
            labels.push(res[i][0])
            cnt.push(res[i][1])
        }
        let total = 0;
        // console.log(cnt[0])
        for (let i = 0; i < cnt.length; i++) {
            total += parseFloat(cnt[i])
        }
        // console.log("total: ",total)
        for (let i = 0; i < cnt.length; i++) {
            // let per = (parseFloat(cnt[i])/t)*100
            // console.log("per: ",per)
            cnt_per.push((cnt[i] / total) * 100)
        }
        // console.log(labels);
        // console.log(cnt_per);
        setVisitedSpotsData({labels: labels, count: cnt_per})
    }

    async function getTopVisitedSpotsOfWeek(){
        const res = await RecommendationAPI.getTopVisitedSpotsOfWeek();
        // console.log("res: ",res)
        const labels = res.map(item => item.name);
        const count = res.map(item => item.count);
        console.log(labels);
        console.log(count);
        setLastSevenDaysData({labels: labels, count: count})
    }

    async function getFoodsOfSpot(spot_list) {
        let spot_ids = spot_list.map(spot => spot.spot_id)
        const res = await RecommendationAPI.getFoodsFromSpotIDs(spot_ids)
        console.log("getFoodsOfSpot: ", res)
    }

    useEffect(
        () => {
            async function getData(token) {
                let res1 = await RecommendationAPI.getRecommendationByUserVisitedSpot(token);
                await setSpotRecommendationByVisit(res1);
                // console.log("res ",res);
                let res = await RecommendationAPI.getUserVisitedSpots(token);
                await setUserVisitedSpots(res);
                // console.log("res ", res);
                res = await RecommendationAPI.getUserInterests(token);
                await setUserInterestObjs(res);
                // console.log("res ", res);
                // console.log("here i am 1")
                if (res.length !== 0) {
                    let interests = [];
                    for (let i = 0; i < res.length; i++) {
                        interests.push(res[i].interest);
                    }
                    await setUserInterests(interests);
                    // console.log("interests : ",interests);
                    res = await RecommendationAPI.getRecommendatioByUserInterest(token, interests);
                    await setSpotRecommendationByInterests(res);
                    // console.log("here i am 2")
                    // console.log("res ",res);
                    if (spotRecommendationByVisit.length !== 0 && res.length !== 0) {
                        await getUniqueSpots();
                    }
                }
                // if (res1.length !== 0) {
                //     console.log("here i am 4")
                //     let foodres = await getFoodsOfSpot(res1);
                //     await setFoodOfVisitRecommendation(foodres);
                // }

                await getTopVisitedSpots(token);
                await getTopVisitedSpotsOfWeek();
            }

            async function fetchUser() {
                const t = JSON.parse(localStorage.getItem("token"));
                if (t) {
                    await getData(t).then(setShow(true));
                } else {
                    await getTopVisitedSpots(t);
                    await getTopVisitedSpotsOfWeek();
                }
            }

            fetchUser().then();
        }, []);

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    }));

    if (show) {
        return (

            <div className="container">
                <h1 className="center_title">Recommendation</h1>

                <div className="row" style={{paddingTop: 50}}>
                    <div className="col-6">
                        <ShowDoughnut data={VisitedSpotsData} title={"User Visited Spots"}/>
                    </div>
                    <div className="col-6">
                        <ShowBarChart labels={lastSevenDaysData.labels} data={lastSevenDaysData.count}  title={"Top 5 Visited Spots of the Week"}/>
                    </div>
                </div>
                <>
                    {userVisitedSpots.length !== 0 &&
                        <div className="row" style={{paddingTop: 50}}>
                            <Box sx={{flexGrow: 1}}>
                                <h4>Your Visited Spots:</h4>
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                                    {userVisitedSpots.map((item, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index}>
                                            <Item><h5>{item.name}</h5>
                                                <Rating name="read-only" value={item.rating} readOnly/>
                                            </Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </div>
                    }
                </>

                <div className="row" style={{paddingTop: 50}}>

                    {
                        spotRecommendationByVisit.length !== 0 ?
                            <div>
                                <h2 className="center_title" style={{marginBottom: "20px"}}>Recommendation by visited
                                    spots</h2>
                                <ShowSpots data={spotRecommendationByVisit}/>
                            </div>
                            :
                            <>
                                {
                                    userVisitedSpots.length !== 0 &&
                                    <div>You didn't provide any visited place info.</div>
                                }
                            </>
                    }
                </div>
                <>
                    {userInterests.length !== 0 &&
                        <div className="row" style={{paddingTop: 50}}>
                            <Box sx={{flexGrow: 1}}>
                                <h4>Your interests:</h4>
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                                    {userInterests.map((interest, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index}>
                                            <Item><h5>{interest}</h5></Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </div>
                    }
                </>
                <div className="row" style={{paddingTop: 50}}>
                    {
                        spotRecommendationByInterests.length !== 0 ?
                            <>
                                <h2 className="center_title" style={{marginBottom: "20px"}}>Recommendation by
                                    interests</h2>
                                <ShowSpots data={spotRecommendationByInterests}/> </>
                            :
                            <>{
                                userInterests.length !== 0 ?
                                    <div></div>
                                    :
                                    <div>You didn't provide any interest info.</div>
                            }
                            </>
                    }
                </div>


            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row" style={{paddingTop: 50}}>
                    <div className="col-6">
                        <ShowDoughnut data={VisitedSpotsData} title={"User Visited Spots"}/>
                    </div>
                    <div className="col-6">
                        <ShowBarChart labels={lastSevenDaysData.labels} data={lastSevenDaysData.count} title={"Top 5 Visited Spots of the Week"}/>
                    </div>

                </div>

                <h1>PLEASE LOG IN TO SEE MORE RECOMMENDATIONS.</h1>
                <h4>You can <Link href="login"> log in</Link> or <Link href="Registration">Register</Link>.</h4>
            </div>
        )
    }
}