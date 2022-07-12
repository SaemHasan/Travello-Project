import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Sliders.css';
import {sliderData} from "./slider-data";

export class Sliders extends Component {
    render() {
    var imgSlides = () =>
    sliderData.map((slide, index) => (
      <div className="imgpad">
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}
          <img src={slide.image} alt="slide" className="imgdetails" />
      </div>
    ));
  return (
    <div id = "explore">
         <div>
            <div  style={{marginBottom: "20px"}} >
            <div class="col-sm-12 btn btn-info">
            Explore your favourites
            </div>
            </div>
            </div>
        <div style={{marginBottom: "40px"}}>
      <Slider
        dots={true}
        slidesToShow={2}
        slidesToScroll={1}
        autoplay={true}
        arrows={true}
        autoplaySpeed={3000}>{imgSlides()}</Slider></div>
    </div>
  );
}
}
export default Sliders;