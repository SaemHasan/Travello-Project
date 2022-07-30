import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Sliders.css';
// import {sliderData} from "./slider-data";
import HomeAPIService from "../../home/HomeAPIService";

export class SlidersFood extends Component {

    constructor(props) {
        super(props);
        this.state = { foods : [],
        frontend_img_path: "assets/food/",
        };
    }

    async componentDidMount() {
        const response = await HomeAPIService.getTopFoods(5);
        response.map((num, index) => {
        num.image = this.updateImgPath(num.image);
        })
        this.setState({ foods: response });
        // console.log("spots",this.state.spots);
    }

    updateImgPath(imgPath){
        const myArray = imgPath.split("/");
        return myArray[myArray.length-1];
    }

    render() {
    let imgSlides = () =>
    this.state.foods.map((slide, index) => (
      <div className="imgpad" key={slide.food_id}>
          {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}



                      <ul>
                <li>
          <img src={this.state.frontend_img_path+slide.image} alt="slide" className="imgdetails" />
          <h2>{slide.food_name}</h2>
      <span className="large-slide">
          <div className="div-color-slide">

              <img src={this.state.frontend_img_path+slide.image} alt="slide" className="large-image-slide" />
              <div className="div-description">

                <p><b>{slide.short_description}</b></p>
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