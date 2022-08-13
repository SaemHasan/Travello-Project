import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Sliders.css";
import HomeAPIService from "../../home/HomeAPIService";
import { Link } from "@mui/material";

export class SlidersPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      api_path: "http://127.0.0.1:8000",
      absoulute_path: "../../../backend/trvello_Project",
      frontend_img_path: "assets/place/",
    };
  }

  async componentDidMount() {
    const response = await HomeAPIService.getTopPlaces(5);
    // response.map((num, index) => {
    //   num.image = this.updateImgPath(num.image);
    // });
    this.setState({ places: response });
    //console.log(this.state.api_path + this.state.places[1].image)
    // console.log(this.state.places);
  }

  // updateImgPath(imgPath) {
  //   const myArray = imgPath.split("/");
  //   return myArray[myArray.length - 1];
  // }

  handleClick(place) {
    console.log("clicked");
    localStorage.setItem("place", JSON.stringify(place));
    localStorage.removeItem("spot");
    localStorage.removeItem("food");
    // console.log(place);
  }

  render() {
    // console.log(this.state.places);
    let imgSlides = () =>
      this.state.places.map((slide, index) => (
        <div className="imgpad" key={slide.place_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}

          <ul>
            <li>
              <Link
                underline="hover"
                onClick={(e) => this.handleClick(slide)}
                href="/oneplace"
                style={{ color: "black" }}
              >
                <img
                  src={this.state.api_path + slide.image}
                  alt="slide"
                  className="imgdetails"
                />
                <h2>{slide.name}</h2>
                <span className="large-slide">
                  <div className="div-color-slide">
                    <img
                      src={this.state.api_path + slide.image}
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
export default SlidersPlace;
