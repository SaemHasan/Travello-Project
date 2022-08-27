export default class HomeAPIService {
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

  static getAllplaceSpotNames() {
    return fetch(`http://127.0.0.1:8000/api/places/getAllplaceSpotNames/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({  }),
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

  static getTopVisitedSpotsOfToday() {
    return fetch(`http://127.0.0.1:8000/api/spot_visit_counts/getTopVisitedSpotsOfToday/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({  }),
    }).then((resp) => resp.json());
  }

  static searchPlace(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/places/getSearchResult/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

  static searchSpot(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/spots/getSearchResult/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

  static searchFood(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/foods/getSearchResult/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

  static searchActivity(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/activities/getSearchResult/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

  static searchSpotActivity(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/spots/getOneSpotActivities_search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

  static searchSpotFood(keyword, location) {
    return fetch(`http://127.0.0.1:8000/api/spots/getOneSpotFoods_search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ keyword: keyword, location: location }),
    }).then((resp) => resp.json());
  }

}
