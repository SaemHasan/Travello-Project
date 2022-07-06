import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../explore_slider.css';

export class Explore_slider extends Component {
    render() {
        var images = [
            { img: 'assets/w5.png' },
            { img: 'assets/w4.png' },
            { img: 'assets/w3.png' },
            { img: 'assets/w4.png' },
            { img: 'assets/w4.png' },
            { img: 'assets/w4.png' },
          ];
    var imgSlides = () =>
    images.map(num => (
      <div className="imgpad">
          <img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>
      </div>
    ));
  return (
    <div id = "explore">
         <div>
            <div  style={{marginBottom: "20px"}} >
            <div class="col-sm-12 btn btn-info">
            Explore
            </div>
            </div>
            </div>
        <div style={{marginBottom: "40px"}}>
      <Slider
    dots={true}
        slidesToShow={2}
        slidesToScroll={2}
        autoplay={false}
        arrows={true}
        autoplaySpeed={3000}>{imgSlides()}</Slider></div>
    </div>
  );
}
}
export default Explore_slider;