import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Sliders.css';
import {sliderData} from "./slider-data";
import HomeAPIService from "../../home/HomeAPIService";
import { Link } from "@mui/material";

export class SlidersActivity extends Component {
    constructor(props) {
    super(props);
    this.state = {
      activities: [],
      api_path: "http://127.0.0.1:8000",
      frontend_img_path: "assets/activity/",
    };
  }
  async componentDidMount() {
    const response = await HomeAPIService.getTopActivities(5);
    // response.map((num, index) => {
    //   num.image = this.updateImgPath(num.image);
    // });
    this.setState({ activities: response });
    // console.log(response);
    // console.log("spots",this.state.spots);
  }
  handleClick(activity) {
    // console.log("food clicked");
    localStorage.setItem("activity", JSON.stringify(activity));
    localStorage.removeItem("place");
    localStorage.removeItem("spot");
  }

    render() {
    var imgSlides = () =>
    this.state.activities.map((slide, index) => (
      <div className="imgpad" key={slide.activity_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}



                      <ul>
                <li>
                    <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => this.handleClick(slide)}
                href="/oneActivity"
              >
          <img src={this.state.api_path + slide.image} alt="slide" className="imgdetails"  />
          <h2>{slide.activity_name}</h2>
      <span className="large-slide">
          <div className="div-color-slide">

              <img src={this.state.api_path + slide.image} alt="slide" className="large-image-slide" />
              <div className="div-description">

                <p><b>{slide.description}</b></p>
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

      </span></Link>
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
export default SlidersActivity;