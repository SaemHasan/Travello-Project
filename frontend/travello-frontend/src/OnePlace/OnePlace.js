import "../App.css";
import OnePlaceDesc from "./OnePlaceDesc";
import ReviewBox from "./ReviewBox";
import ShowReviews from "./ShowReviews";

function OnePlace() {
  return (
    <div className="body">
      <OnePlaceDesc />
      <ReviewBox />
      <ShowReviews />
    </div>
  );
}

export default OnePlace;
