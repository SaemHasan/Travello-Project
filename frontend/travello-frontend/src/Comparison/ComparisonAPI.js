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
}