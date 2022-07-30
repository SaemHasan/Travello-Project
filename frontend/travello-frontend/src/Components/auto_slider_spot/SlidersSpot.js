import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Sliders.css";
// import {sliderData} from "./slider-data";
import HomeAPIService from "../../home/HomeAPIService";
import { Link } from "@mui/material";

export class SlidersSpot extends Component {
  constructor(props) {
    super(props);
    this.state = { spots: [], frontend_img_path: "assets/spot/" };
  }

  async componentDidMount() {
    const response = await HomeAPIService.getTopSpots(5);
    response.map((num, index) => {
      num.image = this.updateImgPath(num.image);
    });
    this.setState({ spots: response });
    // console.log("spots",this.state.spots);
  }

  updateImgPath(imgPath) {
    const myArray = imgPath.split("/");
    return myArray[myArray.length - 1];
  }

  handleClick(spot) {
    console.log("spot clicked");
    localStorage.setItem("spot", JSON.stringify(spot));
    localStorage.removeItem("place");
    localStorage.removeItem("food");
    // console.log(place);
  }

  render() {
    // console.log(this.state.spots);
    // console.log(sliderData);
    let imgSlides = () =>
      this.state.spots.map((slide, index) => (
        <div className="imgpad" key={slide.spot_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}

          <ul>
            <li>
              <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => this.handleClick(slide)}
                href="/oneplace"
              >
                <img
                  src={this.state.frontend_img_path + slide.image}
                  alt="slide"
                  className="imgdetails"
                />
                <h2>{slide.name}</h2>
                <span className="large-slide">
                  <div className="div-color-slide">
                    <img
                      src={this.state.frontend_img_path + slide.image}
                      alt="slide"
                      className="large-image-slide"
                    />
                    <div className="div-description">
                      <p>
                        <b>{slide.short_description}</b>
                      </p>
                    </div>
                  </div>
                </span>
              </Link>
            </li>
          </ul>

          {/*<h4>{slide.desc}</h4>*/}
        </div>
      ));
    return (
      <div id="explore">
        <div style={{ marginBottom: "40px", marginLeft: "40px" }}>
          <Slider
            dots={true}
            slidesToShow={2}
            slidesToScroll={1}
            autoplay={true}
            arrows={true}
            autoplaySpeed={3000}
          >
            {imgSlides()}
          </Slider>
        </div>
      </div>
    );
  }
}
export default SlidersSpot;
