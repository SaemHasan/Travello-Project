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

  static getAllActivity() {
    return fetch("http://127.0.0.1:8000/api/activities/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static getAllAgency() {
    return fetch("http://127.0.0.1:8000/api/agencies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static async getAll_Activity_Agency() {
    return await fetch("http://127.0.0.1:8000/api/activity_agencies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static getActivityFromid(number) {
    return fetch(`http://127.0.0.1:8000/api/activities/getActivityFromid/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ id: number }),
    }).then((resp) => resp.json());
  }

  static getAgencyFromid(number) {
    return fetch(`http://127.0.0.1:8000/api/agencies/getAgencyFromid/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ id: number }),
    }).then((resp) => resp.json());
  }

  static addActivityToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activities/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addActivityTypeToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activity_types/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addAgencyToDB(body) {
    return fetch("http://127.0.0.1:8000/api/agencies/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addActivityAgencyToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activity_agencies/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addActivityPriceInfoToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activity_price_infos/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addActivityRatingInfoToDB(body) {
    return fetch("http://127.0.0.1:8000/api/activity_rating_infos/", {
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

  static addPlaceRatingInfoToDB(body) {
    return fetch("http://127.0.0.1:8000/api/place_rating_infos/", {
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

  static getSpotTypes() {
    return fetch("http://127.0.0.1:8000/api/spot_type_tables/", {
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

  static addSpotRatingInfoToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spot_rating_infos/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addSpotTypeTableToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spot_type_tables/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addSpotTypeToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spot_types/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addSpotFoodToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spot_foods/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static addSpotActivityToDB(body) {
    return fetch("http://127.0.0.1:8000/api/spot_activities/", {
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

  static addRestaurantToDB(body) {
    return fetch("http://127.0.0.1:8000/api/restaurants/", {
      method: "POST",
      body: body,
    }).then((resp) => resp.json());
  }

  static getAllFoods() {
    return fetch("http://127.0.0.1:8000/api/foods/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }
}
