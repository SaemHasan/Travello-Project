export default class OneActivityAPI {
    static getAgencyFromActivityID(activity_id) {
    return fetch("http://127.0.0.1:8000/api/activity_agencies/getAgencyFromActivityID/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
      body: JSON.stringify({activity_id : activity_id}),
    }).then((resp) => resp.json());
  }
}