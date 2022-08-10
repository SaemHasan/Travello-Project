export default class ExploreAPI {
  static getAllPlaces() {
    return fetch(`http://127.0.0.1:8000/api/places/getAllPlaces/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify(),
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
    // static getAllFood(spot_id) {
    // return fetch(`http://127.0.0.1:8000/api/spot_foods/getAllFood/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Authorization: `Token ${token}`,
    //   },
    //   body: JSON.stringify({ spot_id: spot_id }),
    // }).then((resp) => resp.json());
  //}
}
