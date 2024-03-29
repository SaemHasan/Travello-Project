import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Sliders.css";
import { Link } from "@mui/material";
import SinglePlaceAPI from "./SinglePlaceAPI";

export class SlidersSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      frontend_img_path: "assets/spot/",
      api_path: "http://127.0.0.1:8000",
    };
  }

  async componentDidMount() {
    const explore_place = JSON.parse(localStorage.getItem("explore_place"));
    if (explore_place !== null) {
            let my_place = [];
      {
        explore_place.map((r) =>
          my_place.push({
            id: r.place_id,
            name: r.name,
            short_description: r.short_description,
            image: r.image,
          })
        );
      }
          const response = await SinglePlaceAPI.getSpotsByPlaceID(my_place[0].id);

          this.setState({ spots: response });

    }
        const p = JSON.parse(localStorage.getItem("place"));

    if (p !== null) {
        const response = await SinglePlaceAPI.getSpotsByPlaceID(p.place_id);

          this.setState({ spots: response });

    }






  }

  // updateImgPath(imgPath) {
  //   const myArray = imgPath.split("/");
  //   return myArray[myArray.length - 1];
  // }

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
                  src={this.state.api_path + slide.image}
                  alt="slide"
                  className="imgdetails"
                />
                <h2 style={{textAlign:"center"}}>{slide.name}</h2>
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
        <div style={{ marginBottom: "40px", marginLeft: "400px" }}>
          <Slider
            dots={false}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            arrows={false}
            autoplaySpeed={1000}
          >
            {imgSlides()}
          </Slider>
        </div>
      </div>
    );
  }
}
export default SlidersSpot;
