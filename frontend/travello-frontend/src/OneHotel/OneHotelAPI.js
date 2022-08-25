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
  static getOneHotelAttribute(hotel_id) {
    return fetch(`http://127.0.0.1:8000/api/hotel_attribute_tables/getOneHotelAttribute/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotel_id }),
    }).then((resp) => resp.json());
  }
  static getRooms(hotel_id) {
    return fetch(`http://127.0.0.1:8000/api/rooms/getRooms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotel_id }),
    }).then((resp) => resp.json());
  }

  static getOneHotelMisc(hotel_id) {
    return fetch(`http://127.0.0.1:8000/api/hotels/getOneHotelMisc/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ hotel_id: hotel_id }),
    }).then((resp) => resp.json());
  }

}
