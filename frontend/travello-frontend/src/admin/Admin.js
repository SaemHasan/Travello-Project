import {useEffect, useState} from "react";
import APIService from "../APIService";
import AdminInfo from "./AdminProfile";
import AddInfo from "./AddInfo";
import AdminSideBar from "./ShowSideBar";
import AdminNavBar from "./AdminNavBar";
import AdminAPI from "./AdminAPI";
import {ShowBarChart} from "./ShowBarChart";

function Admin() {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const user_image = "/assets/user.jpeg";
    const [showAddInfo, setShowAddInfo] = useState(false);

    const [userLogincountOfWeek, setUserLogincountOfWeek] = useState({});
    const [mostLoginUser, setMostLoginUser] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await AdminAPI.getUserLoginCountOfLastWeek();
            // console.log("userLogincountOfWeek ", res);
            const labels = [];
            const data = [];
            for (let i = 0; i < res.length; i++) {
                // console.log(res[i]);
                labels.push(res[i].date);
                data.push(res[i].count);
            }
            // console.log("labels ", labels);
            // console.log("data ", data);
            await setUserLogincountOfWeek({
                labels: labels,
                data: data
            });
        }

        fetchData().then(setShow(true));
    }, []);


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
                    <>
                        <div className="row">
                            <div className="col-6 center">
                                <AdminInfo user={user} image={user_image} token={token}/>
                            </div>
                        </div>
                        <div>

                                {
                                    show &&
                                    <div>
                                        <ShowBarChart labels={userLogincountOfWeek.labels}
                                                      data={userLogincountOfWeek.data}
                                                      title={"User Log in Count of Last Week"}/>
                                    </div>
                                }
                        </div>
                    </>
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
