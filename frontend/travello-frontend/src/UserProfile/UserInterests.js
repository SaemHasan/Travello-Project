import { useEffect, useState } from "react";
import UserProfileAPI from "./UserProfileAPI";

function UserInterests() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const t = JSON.parse(localStorage.getItem("token"));
      if (t) {
        const resp = await UserProfileAPI.getUserInterest(t);
        console.log(resp);
        await setInterests(resp);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="col-3 center">
      <h3>User Interests:</h3>
      <ul className="list-group list-group-flush">
        {interests.map((item) => (
          <li className="list-group-item" key={item.interest_id}>
            {item.interest}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserInterests;
