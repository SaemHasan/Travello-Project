import React, {useEffect, useState} from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "../Components/Search_bar";
import SlidersActivity from "../Components/auto_slider_activity/SlidersActivity";
import SlidersFood from "../Components/auto_slider_food/SlidersFood";
import SlidersPlace from "../Components/auto_slider_place/SlidersPlace";
import SlidersSpot from "../Components/auto_slider_spot/SlidersSpot";
import Footer from "../Components/Footer/Footer";
import HomeAPIService from "./HomeAPIService";
import {ShowBarChart} from "./ShowBarChart";

function Home() {
    const [topVisitedSpotsOfToday, setTopVisitedSpotsOfToday] = useState([]);
    const [labels, setLabels] = useState([]);
    const [count, setCount] = useState([]);
    useEffect(() => {
        async function getTopVisitedSpotsOfToday(){
            const res = await HomeAPIService.getTopVisitedSpotsOfToday()
            await setTopVisitedSpotsOfToday(res)
            // console.log(res)
            const labels = res.map(item => item.name)
            await setLabels(labels)
            const count = res.map(item => item.count)
            await setCount(count)
            // console.log(labels)
            // console.log(count)
        }
        getTopVisitedSpotsOfToday().then( () => {

        })
    } , []);

  return (
    <div className="App" style={{paddingLeft:"50px", paddingRight:"50px"}}>
      <div>
        <SearchBar />
      </div>
      <div className="col-6 center">
          <ShowBarChart labels={labels} data={count} title={"Today's Top Visited Spots"}/>
      </div>
      <div>
        <div style={{ marginBottom: "20px", height: "40px" }}>
          <div className="col-sm-12 btn btn-info">
            <b>Explore your favourites places</b>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "-50px" }}>
        <SlidersPlace />
      </div>
      <div>
        <div style={{ marginBottom: "20px", height: "40px" }}>
          <div className="col-sm-12 btn btn-info">
            <b>Explore your favourites spots</b>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "-50px" }}>
        <SlidersSpot />
      </div>
      <div>
        <div style={{ marginBottom: "20px", height: "40px" }}>
          <div className="col-sm-12 btn btn-info">
            <b>Explore your favourites foods</b>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "-50px" }}>
        <SlidersFood />
      </div>
      <div>
        <div style={{ marginBottom: "20px", height: "40px" }}>
          <div className="col-sm-12 btn btn-info">
            <b>Explore your favourites activities</b>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "-50px" }}>
        <SlidersActivity />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
