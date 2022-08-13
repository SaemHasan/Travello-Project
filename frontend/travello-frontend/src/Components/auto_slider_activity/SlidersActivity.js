import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Sliders.css";
import HomeAPIService from "../../home/HomeAPIService";

export class SlidersActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      api_path: "http://127.0.0.1:8000",
    };
  }

  async componentDidMount() {
    const response = await HomeAPIService.getTopActivities(5);
    this.setState({ activities: response });
  }

  render() {
    var imgSlides = () =>
      this.state.activities.map((slide, index) => (
        <div className="imgpad" key={slide.activity_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}

          <ul>
            <li>
              <img
                src={this.state.api_path + slide.image}
                alt="slide"
                className="imgdetails"
              />
              <h2>{slide.activity_name}</h2>
              <span className="large-slide">
                <div className="div-color-slide">
                  <img
                    src={this.state.api_path + slide.image}
                    alt="slide"
                    className="large-image-slide"
                  />
                  <div className="div-description">
                    <p>
                      <b>{slide.description}</b>
                    </p>
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
export default SlidersActivity;
