import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import APIService from "../APIService";
import UserInterests from "./UserInterests";

function UserProfile() {
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
      {/*<h1>User</h1>*/}
      <UserInfo user={user} image={user_image} />
      <UserInterests />
    </div>
  );
}

export default UserProfile;
