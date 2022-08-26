import "../App.css";
import OnePlaceDesc from "./OnePlaceDesc";
import ReviewBox from "./ReviewBox";
import ShowReviews from "./ShowReviews";

function OnePlace() {
  return (
    <div className="body" style={{paddingLeft:"50px", paddingRight:"50px"}}>
      <OnePlaceDesc />
      <ReviewBox />
      <ShowReviews />
    </div>
  );
}

export default OnePlace;
