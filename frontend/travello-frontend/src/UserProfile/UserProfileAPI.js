export default class UserProfileAPI {
  static getUserInterest(token) {
    return fetch(`http://127.0.0.1:8000/api/users/getUserInterests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ token: token }),
    }).then((resp) => resp.json());
  }
}
