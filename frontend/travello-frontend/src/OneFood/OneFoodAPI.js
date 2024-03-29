export default class OneFoodAPI {


  static getRestaurantFromFoodID(food_id) {
    return fetch("http://127.0.0.1:8000/api/food_restaurants/getRestaurantFromFoodID/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({food_id : food_id}),
    }).then((resp) => resp.json());
  }

  static getReviews() {
    return fetch("http://127.0.0.1:8000/api/reviews/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static getReviewbyID(user_id, place_id) {
    return fetch("http://127.0.0.1:8000/api/reviews/getReview/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ place_id: place_id }),
    }).then((resp) => resp.json());
  }

  static getOneSpotbyID(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spots/getOneSpotbyID/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

}
