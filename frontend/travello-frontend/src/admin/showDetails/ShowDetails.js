import { Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import AdminAPI from "../AdminAPI";

export default function ShowDetails(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(props.type);
      const response = await AdminAPI.getFromDB(props.type);
      await setData(response.data);
      console.log("data : ", data);
    }
    fetchData().then(() => console.log("fetched data"));
  }, []);

  return (
    <div>
      <h1>Details</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <item>item.name</item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
