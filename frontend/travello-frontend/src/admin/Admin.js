import { useEffect, useState } from "react";
import APIService from "../APIService";
import AddModal from "./AddModal";
import AdminInfo from "./AdminProfile";
import AddActivityModal from "./activity/AddActivityModal";
import GridShow from "./AddCard";
import ActivityGridShow from "./activity/ShowActivityCards";
import FoodGridShow from "./food/ShowFoodCards";
import HotelGridShow from "./hotel/ShowHotelCards";
import SpotGridShow from "./spot/ShowSpotCards";

function Admin() {
  const [user, setUser] = useState({});
  const user_image = "/assets/user.jpeg";

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      APIService.getUserObject(token)
        .then(async (user) => {
          await setUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="container">
      <h1>Admin Page</h1>
      <AdminInfo user={user} image={user_image} />
      {/*<GridShow />*/}
      <SpotGridShow />
      <ActivityGridShow />
      <FoodGridShow />
      <HotelGridShow />
    </div>
  );
}

export default Admin;
