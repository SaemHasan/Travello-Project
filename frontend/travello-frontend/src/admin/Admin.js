import { useEffect, useState } from "react";
import APIService from "../APIService";
import AdminInfo from "./AdminProfile";
import AddInfo from "./AddInfo";

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
      <AddInfo />
    </div>
  );
}

export default Admin;
