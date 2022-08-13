import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddActivityAgencyModal from "../../activity/AddActivity_AgencyModal";

export default function ShowActivityAgency() {
  const [data, setData] = useState([]);
  const type = "activity_agencies";
  async function fetchData() {
    await AdminAPI.getFromDB(type).then(async (res) => {
      await setData(res);
    });
  }

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchData().then(() => {});
    // console.log("data: ", data);
  }, []);

  const handleDelete = async (id) => {
    await AdminAPI.deleteFromDB(type, id);
    fetchData().then(() => {});
  };

  const handleAddModalShow = () => {
    setShowModal(true);
  };

  const handleClose = (type) => {
    setShowModal(false);
    window.location.reload(false);
  };

  return (
    <div>
      {/*<h1>Activity Agency</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Activity Agency</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Activity Agency
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddActivityAgencyModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.activity_agency_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Activity Agency ID : {item.activity_agency_id}
                </Typography>
                <Typography variant="body2" color="secondary">
                  Activity ID : {item.activity_id}
                </Typography>

                <Typography variant="body2" color="secondary">
                  Agency ID : {item.agency_id}
                </Typography>
                <Typography variant="body2" color="secondary">
                  <Rating name="read-only" value={item.rating} readOnly />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">
                  Update
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.activity_agency_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
