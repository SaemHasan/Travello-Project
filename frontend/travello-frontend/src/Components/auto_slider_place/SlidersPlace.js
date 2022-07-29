import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Sliders.css';
import HomeAPIService from "../../home/HomeAPIService";

export class SlidersPlace extends Component {
    constructor(props) {
        super(props);
        this.state = { places : [],
            api_path : "http://127.0.0.1:8000/api/",
            absoulute_path: "../../../backend/trvello_Project",
        };
  }

  async componentDidMount() {
    const response = await HomeAPIService.getTopPlaces(5);
    this.setState({ places: response });
  }

     render() {
        // console.log(this.state.places);
        let imgSlides = () =>
            this.state.places.map((slide, index) => (
                <div className="imgpad" key={slide.place_id}>
                    {/*<img className="imgdetails" src= {num.img} width="100%" alt={"explore img"}/>*/}


                    <ul>
                        <li>
                            <img src={slide.image} alt="slide" className="imgdetails"/>
                            <h2>{slide.name}</h2>
                            <span className="large-slide">
          <div className="div-color-slide">

              <img src={slide.image} alt="slide" className="large-image-slide"/>
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
            <div id="explore">

                <div style={{marginBottom: "40px", marginLeft: "40px"}}>
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
export default SlidersPlace;