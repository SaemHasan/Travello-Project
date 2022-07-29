export default class HomeAPIService{
    static getTopPlaces(number) {
    return fetch(`http://127.0.0.1:8000/api/places/getTopPlaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ number: number }),
    }).then((resp) => resp.json());
  }

  static getTopSpots(number) {
    return fetch(`http://127.0.0.1:8000/api/spots/getTopSpots/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ number: number }),
    }).then((resp) => resp.json());
  }

  static getTopFoods(number) {
    return fetch(`http://127.0.0.1:8000/api/foods/getTopFoods/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ number: number }),
    }).then((resp) => resp.json());
  }

  static getTopActivities(number) {
    return fetch(`http://127.0.0.1:8000/api/activities/getTopActivities/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ number: number }),
    }).then((resp) => resp.json());
  }
}