export default class ComparisonAPI {
  static getAllActivity(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/spot_activities/getAllActivity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }


    static getActivityDetails(activity_id_list) {
    return fetch(`http://127.0.0.1:8000/api/activities/getActivityDetails/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ activity_id_list: activity_id_list }),
    }).then((resp) => resp.json());
  }
  static getActivityFilters() {
    return fetch(`http://127.0.0.1:8000/api/activity_types/getActivityFilters/`, {
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
  static getOneFood(food_id) {
    return fetch(`http://127.0.0.1:8000/api/foods/getOneFood/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ food_id: food_id }),
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
  static getHotelFilters() {
    return fetch(`http://127.0.0.1:8000/api/hotel_attributes/getHotelFilters/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
    }).then((resp) => resp.json());
  }
  static getAllHotels(spot_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getAllHotels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ spot_id: spot_id }),
    }).then((resp) => resp.json());
  }

  static getOneActivity(activity_id) {
    return fetch(`http://127.0.0.1:8000/api/activities/getOneActivity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ activity_id: activity_id }),
    }).then((resp) => resp.json());
  }
}
