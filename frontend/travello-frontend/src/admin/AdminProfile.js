import {useEffect, useState} from "react";
import UserProfileAPI from "../UserProfile/UserProfileAPI";
import UserInterests from "../UserProfile/UserInterests";

function AdminInfo(props) {

    return (
        <div className="container">
            <div className="row center">
                <div className="col-6 card" style={{width: "24rem"}}>
                    {/*<img className="card-img-top" src={props.image} alt="admin" />*/}

                    {/*<AdminPanelSettingsIcon />*/}

                    <div className="card-body">
                        <h5 className="card-title">Username : {props.user.username}</h5>
                        <p className="card-text">Email : {props.user.email}</p>
                        <p className="card-text">First Name : {props.user.first_name}</p>
                        <p className="card-text">Last Name : {props.user.last_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminInfo;
