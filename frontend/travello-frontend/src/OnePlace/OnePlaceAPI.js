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

  static addReview(body, type) {
    return fetch(`http://127.0.0.1:8000/api/${type}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  // static getReviews() {
  //   return fetch("http://127.0.0.1:8000/api/review_places/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Authorization':`Token ${token['mytoken']}`
  //     },
  //   }).then((resp) => resp.json());
  // }

  static getReviewbyPlaceID(place_id, type) {
    return fetch(`http://127.0.0.1:8000/api/${type}/getReview/`, {
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

  static getUserFromID(id) {
    return fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }
}
