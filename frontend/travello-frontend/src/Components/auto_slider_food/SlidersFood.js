import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Sliders.css';
import {sliderData} from "./slider-data";

export class SlidersFood extends Component {
    render() {
    var imgSlides = () =>
    sliderData.map((slide, index) => (
      <div className="imgpad" key={slide.id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}



                      <ul>
                <li key={slide}>
          <img src={slide.image} alt="slide" className="imgdetails" />
          <h2>{slide.heading}</h2>
      <span className="large-slide">
          <div className="div-color-slide">

              <img src={slide.image} alt="slide" className="large-image-slide" />
              <div className="div-description">

                <p><b>{slide.desc}</b></p>
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}
          {/*<h4>This is image description</h4>*/}


              </div>


          </div>

      </span>
                </li>


  </ul>









          {/*<h4>{slide.desc}</h4>*/}
      </div>
    ));
  return (
    <div id = "explore">

        <div style={{marginBottom: "40px", marginLeft:"40px"}}>
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
export default SlidersFood;