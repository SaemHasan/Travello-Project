import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "../Components/Search_bar";
import SlidersActivity from "../Components/auto_slider_activity/SlidersActivity";
import SlidersFood from "../Components/auto_slider_food/SlidersFood";
import SlidersPlace from "../Components/auto_slider_place/SlidersPlace";
import SlidersSpot from "../Components/auto_slider_spot/SlidersSpot";
import Footer from "../Components/Footer/Footer";

function Home() {
  return (
    <div className="App" style={{paddingLeft:"50px", paddingRight:"50px"}}>
      <div>
        <SearchBar />
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
