export default class OnePlaceAPI {
  // static getOnePlace(place_id) {
  //   return fetch(`http://127.0.0.1:8000/api/places/getOnePlaceDetails/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Authorization: `Token ${token}`,
  //     },
  //     body: JSON.stringify({ id: place_id }),
  //   }).then((resp) => resp.json());
  // }
  // static updateImgPath(imgPath) {
  //   const myArray = imgPath.split("/");
  //   return myArray[myArray.length - 1];
  // }

  static addReview(body) {
    return fetch("http://127.0.0.1:8000/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify(body),
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
}
