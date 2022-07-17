import React from "react";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import ArticleList from "../Components/ArticleList";
import DemoList from "../Components/DemoList";
import Hello from "../Components/Hello";
// import pic from "../images/homepage.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
// import APIService from "../APIService";
import SearchBar from "../Components/Search_bar";
import SlidersActivity from "../Components/auto_slider_activity/SlidersActivity";
import SlidersFood from "../Components/auto_slider_food/SlidersFood";
import SlidersPlace from "../Components/auto_slider_place/SlidersPlace";
import SlidersSpot from "../Components/auto_slider_spot/SlidersSpot";


function Home() {
  // const [articles, setArticles] = useState([]);
  // const [demos, setDemos] = useState([]);

  // const vidRef = useRef();
  //
  // useEffect(() => {
  //   vidRef.current.play();
  // }, []);

  //   useEffect(() => {
  //       APIService.GetArticles()
  //           .then(resp => setArticles(resp))
  //           .catch(error => console.log(error))
  // }, [])
  //
  //   useEffect(()=>{
  //       APIService.GetDemo()
  //           .then(resp => setDemos(resp))
  //           .catch(error => console.log(error))
  //   },[])

  return (
    <div className="App">
      {/*<div id = "clearDiv"  className = "img"><img src={pic}   alt={"waterfall"}/></div>*/}
      {/*<div>*/}
      {/*  <video src="tourism.mp4" ref={vidRef} muted autoPlay loop />*/}
      {/*</div>*/}
      <div>
        <SearchBar />
      </div>
      {/*<div>*/}
      {/*  <h3> Top five places </h3>*/}
      {/*</div>*/}
      <div>
        <div style={{ marginBottom: "20px", height: "40px"}}>
          <div className="col-sm-12 btn btn-info">
              <b>Explore your favourites places</b>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "-50px" }}>
        <SlidersPlace />
      </div>
      {/*<div>*/}
      {/*  <h3> Top five spots </h3>*/}
      {/*</div>*/}
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
      {/*<div>*/}
      {/*  <h3> Top five foods </h3>*/}
      {/*</div>*/}
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
      {/*<div>*/}
      {/*  <h3> Top five activities </h3>*/}
      {/*</div>*/}
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
      {/*<Hello/>*/}
      {/*<ArticleList articles={articles}></ArticleList>*/}
      {/*<DemoList demos={demos}/>*/}
    </div>
  );
}

export default Home;
