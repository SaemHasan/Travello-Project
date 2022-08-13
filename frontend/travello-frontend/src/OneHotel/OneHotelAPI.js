export default class OneHotelAPI {

  static getOneHotel(hotel_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getOneHotel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotel_id }),
    }).then((resp) => resp.json());
  }

}
