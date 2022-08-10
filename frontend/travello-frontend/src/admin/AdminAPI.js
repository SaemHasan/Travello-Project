export default class AdminAPI {
  // activity related api calls
  static getActivityTypes() {
    return fetch("http://127.0.0.1:8000/api/activity_types/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static addActivityToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activities/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  // spot related api calls
  static addPlaceToDB(body) {
    return fetch("http://127.0.0.1:8000/api/places/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static getPlaces() {
    return fetch("http://127.0.0.1:8000/api/places/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static getSpots() {
    return fetch("http://127.0.0.1:8000/api/spots/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static addSpotToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spots/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  // hotel related api calls
  static addHotelToDB(body) {
    return fetch("http://127.0.0.1:8000/api/hotels/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  // food related api calls
  static addFoodToDB(body) {
    return fetch("http://127.0.0.1:8000/api/foods/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }
}
