import {useEffect, useState} from "react";
import APIService from "../APIService";
import AdminInfo from "./AdminProfile";
import AddInfo from "./AddInfo";
import AdminSideBar from "./ShowSideBar";
import AdminNavBar from "./AdminNavBar";

function Admin() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const user_image = "/assets/user.jpeg";
    const [showAddInfo, setShowAddInfo] = useState(false);


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setToken(token);
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
        <>
            <div className="container">
                <h1 className="center_title">Admin Page</h1>
                <div className="row col-6 center">
                    {/*<AdminSideBar/>*/}
                    <AdminNavBar setAddInfo={setShowAddInfo}/>
                </div>
                {
                    !showAddInfo &&
                    <div className="row">
                        <div className="col-6 center">
                            <AdminInfo user={user} image={user_image} token={token}/>
                        </div>
                    </div>

                }
                {
                    showAddInfo &&
                    <div className="row">
                        <AddInfo/>
                    </div>
                }

                {/*<GridShow />*/}


            </div>

        </>
    )
        ;
}

export default Admin;
