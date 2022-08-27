export default class ExploreAPI {
  static getAllPlaces(spotsLength) {
    return fetch(`http://127.0.0.1:8000/api/places/getAllPlaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({spotsLength : spotsLength}),
    }).then((resp) => resp.json());
  }

  static getAllSpot(place_id) {
    return fetch(`http://127.0.0.1:8000/api/spots/getAllSpot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ place_id: place_id }),
    }).then((resp) => resp.json());
  }

  static getAllSpots() {
    return fetch(`http://127.0.0.1:8000/api/spots/getAllSpots/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  }

  static getActivitiesNames() {
    return fetch(`http://127.0.0.1:8000/api/activities/getActivitiesNames/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  }

  static getFoodFilters() {
    return fetch(`http://127.0.0.1:8000/api/food_type_tables/getFoodFilters/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  }

  static getSpotTypeNames() {
    return fetch(`http://127.0.0.1:8000/api/spot_type_tables/getSpotTypeNames/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  }

  static getAllFood(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_foods/getAllFood/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

  static getFoodTypes(foods) {
    return fetch(`http://127.0.0.1:8000/api/food_types/getFoodTypes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ foods: foods }),
    }).then((resp) => resp.json());
  }

  static getAllActivityExplore(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_activities/getAllActivityExplore/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

  static getAllSpotTypeExplore(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_types/getAllSpotTypeExplore/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
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

  static getOnePlacebyID(place_id) {
    return fetch(`http://127.0.0.1:8000/api/places/getOnePlacebyID/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ place_id: place_id }),
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

  static getAgencyCorExplore(activity_id_list, hotel_list_byID) {
    return fetch(`http://127.0.0.1:8000/api/activity_agencies/getAgencyCorExplore/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ activity_id_list:activity_id_list, hotel_list_byID:hotel_list_byID }),
    }).then((resp) => resp.json());
  }

    static getMinDistance(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getMinDistance/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }
}
