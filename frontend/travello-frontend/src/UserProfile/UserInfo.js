import Button from "react-bootstrap/Button";

function UserInfo(props) {
  return (
    <div>
      <div className="row">
        <div className="card center" style={{ width: "24rem" }}>
          <img className="card-img-top" src={props.image} />
          <div className="card-body">
            <h5 className="card-title">Username : {props.user.username}</h5>
            <p className="card-text">Email : {props.user.email}</p>
            <p className="card-text">First Name : {props.user.first_name}</p>
            <p className="card-text">Last Name : {props.user.last_name}</p>
          </div>
        </div>
      </div>

      {/*<div className="row">*/}
      {/*  <div className="center">*/}
      {/*    <Button>Change Password</Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default UserInfo;
