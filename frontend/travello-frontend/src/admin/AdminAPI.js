export default class AdminAPI {
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
}
