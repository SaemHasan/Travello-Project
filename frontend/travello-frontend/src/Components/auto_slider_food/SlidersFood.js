import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Sliders.css";
import HomeAPIService from "../../home/HomeAPIService";
import { Link } from "@mui/material";

export class SlidersFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      api_path: "http://127.0.0.1:8000",
      frontend_img_path: "assets/food/",
    };
  }

  async componentDidMount() {
    const response = await HomeAPIService.getTopFoods(5);
    // response.map((num, index) => {
    //   num.image = this.updateImgPath(num.image);
    // });
    this.setState({ foods: response });
    // console.log(response);
    // console.log("spots",this.state.spots);
  }

  // updateImgPath(imgPath) {
  //   const myArray = imgPath.split("/");
  //   return myArray[myArray.length - 1];
  // }

  handleClick(food) {
    // console.log("food clicked");
    localStorage.setItem("food", JSON.stringify(food));
    localStorage.removeItem("place");
    localStorage.removeItem("spot");
  }

  render() {
    let imgSlides = () =>
      this.state.foods.map((slide, index) => (
        <div className="imgpad" key={slide.food_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}

          <ul>
            <li>
              <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => this.handleClick(slide)}
                href="/oneFood"
              >
                <img
                  src={this.state.api_path + slide.image}
                  alt="slide"
                  className="imgdetails"
                />
                <h2>{slide.food_name}</h2>
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
                </span>{" "}
              </Link>
            </li>
          </ul>
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
export default SlidersFood;
