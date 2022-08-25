// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import {Card, CardContent, Grid, Link} from "@mui/material";
import ExploreAPI from "../../../../ExploreAPI";
import APIService from "../../../../../APIService";
import Typography from "@material-ui/core/Typography";
import Button from "react-bootstrap/Button";

const api_path = "http://127.0.0.1:8000/media/";

// const Getuser = () => {
//     const [user, setUser] = useState({});
// }

const ListItem = ({
  item: { id, coverSrc, title, desc, price, deliveryFee, serviceTime, rating, category, place_id, place,food,activity, food_names },
}) =>{


    let [food1Dlist, setFood1Dlist] = useState([])
    const [disable, setDisable] = React.useState(false);
      const Visited_btn = () => {
          setDisable(true);
    //       const [user, setUser] = React.useState("");
    //       const token = JSON.parse(localStorage.getItem("token"));
    // if (token) {
    //   // console.log("token is not null");
    //   //setShowReviewBox(true);
    //   APIService.getUserObject(token).then(async (data) => {
    //     console.log(data);
    //     await setUser(data);
    //   });
    // }
    // console.log(user);
  };

    function food_list(){
        while (food1Dlist.length !== 0) {
                  food1Dlist.pop();
                }
        for (let m =0; m < food.length; m++)
              {

                  for (let n =0; n < food[m].length; n++)
                  {
                      food1Dlist.push(food[m][n]);

                  }


              }
        let uniqueArray=[]
              for(let k=0; k < food1Dlist.length; k++){
                  if(uniqueArray.indexOf(food1Dlist[k]) === -1) {
                      uniqueArray.push(food1Dlist[k]);
                  }
              }
        //       setFood1Dlist(uniqueArray);
        //console.log("food1Dlist");
        //console.log(uniqueArray);
        food1Dlist = uniqueArray;
        //console.log(uniqueArray);
        //return food1Dlist;
    }



        function activity_list(){
        // while (activity1Dlist.length !== 0) {
        //           activity1Dlist.pop();
        //         }

        let uniqueArray=[]
              for(let k=0; k < activity.length; k++){
                  if(uniqueArray.indexOf(activity[k]) === -1) {
                      uniqueArray.push(activity[k]);
                  }
              }
        //       setFood1Dlist(uniqueArray);
        //console.log("food1Dlist");
        //console.log(uniqueArray);
        activity = uniqueArray;
        //console.log(uniqueArray);
        //return food1Dlist;
    }



    async function handleClick(id,category,place_id,e) {

    //e.preventDefault();
    //console.log("spot clicked");
    if (category === "place")
    {
        // const token = JSON.parse(localStorage.getItem("token"));
        // if (token) {
        //     APIService.getUserObject(token)
        //     .then(async (user) => {
        //     // console.log("setting user");
        //         await setUser(user);
        //     // console.log("finished setting user");
        //         console.log(user);
        //     })
        //     .catch((err) => {
        //     console.log(err);
        //     });
        // }
        //console.log("place");
        //const user = JSON.parse(localStorage.getItem("log_in_user"));
        //console.log(user);
        localStorage.removeItem("place");
        localStorage.removeItem("food");
        localStorage.removeItem("spot");
        localStorage.removeItem("explore_spot");
        localStorage.removeItem("explore_place");
        const place = await ExploreAPI.getOnePlacebyID(place_id);
        let places = []
        {place.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    places.push({place_id: r.place_id, name: r.name, short_description: r.short_description,  image: r.image,})

                ))};
        //console.log(place);
        localStorage.setItem("explore_place", JSON.stringify(place));
        localStorage.setItem("place", JSON.stringify(places[0]));
        //const explore_place = JSON.parse(localStorage.getItem("explore_place"));
        //console.log(explore_place);
        window.location.href = "/SinglePlace";

    }
    else if (category === "spot")
    {

        //console.log("spot");
        //console.log(id);
        localStorage.removeItem("place");
        localStorage.removeItem("food");
        localStorage.removeItem("spot");
        localStorage.removeItem("explore_spot");
        localStorage.removeItem("explore_place");
        const spot = await ExploreAPI.getOneSpotbyID(id);
        //console.log(spot);
        let my_spot = []
        {spot.map((r) => (
            my_spot.push({spot_id: r.spot_id, name: r.name, short_description : r.short_description, image: r.image,})
        ))};
        localStorage.setItem("explore_spot", JSON.stringify(spot));
        localStorage.setItem("spot", JSON.stringify(my_spot[0]));
        //console.log(my_spot[0].spot_id);
        const explore_spot = JSON.parse(localStorage.getItem("explore_spot"));
        //console.log(explore_spot);
        window.location.href = "/Oneplace";

    }

    //localStorage.setItem("spot", JSON.stringify(spot));
    //localStorage.removeItem("place");
    //localStorage.removeItem("food");
    // console.log(place);
  }

    const MAX_LENGTH = 150;
    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-explore' >


            <ul>
                <li>
                    <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => handleClick(id,category,place_id)}

                //href=
              >
                    {/*<img src={api_path + coverSrc} alt="adventure"/>*/}

                                    <Grid container spacing={3}>


          <Grid item xs={12} md={12} >
            <Card sx={{ maxWidth: 500 }} style={{ width: "320px"}}>
              <CardContent>
                  <h1 style={{alignContent:"center"}}>{title} </h1>
                  <br/>
                  Attractions:



                  {
                      place.slice(0,2).map((attr,key)=>{
                          return(
                             <Typography variant="h6" color="primary">
                                 {attr}
                             </Typography>
                          )
                      })
                  }
                  {/*{food_list()}*/}
                  {/*<br/>*/}

                  {/*Famous Food Types:*/}
                  {/*<Typography variant="h6" color="text.secondary">*/}
                  {/*    {*/}
                  {/*    food1Dlist.map((food)=>{*/}

                  {/*        return(*/}
                  {/*           <Typography variant="h6" color="primary">*/}
                  {/*               {food}*/}
                  {/*           </Typography>*/}
                  {/*        )*/}
                  {/*    })*/}
                  {/*}*/}

                  <br/>

                  Famous Foods :
                  {/*<Typography variant="h6" color="text.secondary">*/}
                                    {
                      food_names.slice(0,2).map((foods,key)=>{

                          return(
                             <Typography variant="h6" color="primary">
                                 {foods}
                             </Typography>
                          )
                      })
                  }
                      {activity_list()}
                      <br/>

                  Famous Activities:
                  {
                      activity.slice(0,2).map((atv,key)=>{
                          return(
                             <Typography variant="h6" color="primary">
                                 {atv}
                             </Typography>
                          )
                      })
                  }
                     Rating: 🌟{rating}
                {/*</Typography>*/}
              </CardContent>
            </Card>
          </Grid>

      </Grid>

                        {/*<p>*/}
                        {/*    {category}*/}
                        {/*</p>*/}
                        {/*                        <p>*/}
                        {/*    {place}*/}
                        {/*</p>*/}
      <span className="large-explore">
          <div className="div-color-explore">

              <img src={api_path + coverSrc} className="large-image-explore" alt="adventure" />
              <div>
          {/*<p className="heading-des"> {toShow} </p>*/}
                      <div>
      {desc.length > MAX_LENGTH ?
        (
          <div className="heading-des">
            {`${desc.substring(0, MAX_LENGTH)}...`}<p style={{color:"blue"}}><u>Read more</u></p>
          </div>
        ) :
        <p>{desc}</p>
      }
    </div>



              </div>


          </div>

      </span>
                </Link>
                    <br/>
                    <div style={{alignContent:"center"}}>
                            <Button disabled={disable} onClick={() => {
                                Visited_btn()
                            }}>
                              Visited
                            </Button>
                        </div>
                </li>


  </ul>















            {/*<img src={coverSrc} alt=''/>*/}
            {/*<header>*/}
            {/*    //<h4>{title}</h4>*/}
            {/*    //<span>🌟{rating}</span>*/}
            {/*</header>*/}
            {/*<footer>*/}
            {/*    <p>*/}
            {/*        <b>{serviceTime}</b> <span> Delivery Fee ${deliveryFee}</span>*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*        <b>${price}</b>*/}
            {/*    </p>*/}
            {/*</footer>*/}
        </div>
    );
};


export default ListItem;
