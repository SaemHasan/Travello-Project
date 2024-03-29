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

  static updateVisitCount(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_visit_counts/updateVisitCount/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

  static getVisitHistoryOfASpot(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_visit_counts/getVisitHistoryOfASpot/`, {
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

  static getHotelMIscofSpot(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getHotelMIscofSpot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

    static getHotelIDCor(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getHotelIDCor/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

  static getActivityIdCor(spot_id, activity_list) {
    return fetch(`http://127.0.0.1:8000/api/spot_activities/getActivityIdCor/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ spot_id: spot_id, activity_list:activity_list }),
    }).then((resp) => resp.json());
  }

    static getAgencyCor(activity_id_list, hotel_list_byID) {
    return fetch(`http://127.0.0.1:8000/api/activity_agencies/getAgencyCor/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ activity_id_list:activity_id_list, hotel_list_byID:hotel_list_byID }),
    }).then((resp) => resp.json());
  }
}
