import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createRoot } from "react-dom/client";

import Layout from "./Layout";
import Home from "./home/Home";
import About from "./About";
import Login from "./login/Login";
import Registration from "./Registration/Registration";
import Explore from "./Explore/Explore";
import Comparison from "./Comparison/Comparison";
import OnePlace from "./OnePlace/OnePlace";
import SearchResult from "./searchResult/SearchResult";
import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import Admin from "./admin/Admin";
import ShowDetails from "./admin/showDetails/ShowDetails";
import ShowPlaces from "./admin/showDetails/spot/ShowPlaces";

// function App() {
//   //   const [articles, setArticles] = useState([])
//   //   const [demos, setDemos] = useState([])
//   //
//   //   useEffect(() => {
//   //       APIService.GetArticles()
//   //           .then(resp => setArticles(resp))
//   //           .catch(error => console.log(error))
//   // }, [])
//   //
//   //   useEffect(()=>{
//   //       APIService.GetDemo()
//   //           .then(resp => setDemos(resp))
//   //           .catch(error => console.log(error))
//   //   },[])
//   //
//   //
//   // return (
//   //   <div className="App">
//   //       <div><Navbar /></div>
//   //       <div id = "clearDiv"  className = "img"><img src={pic}   alt={"waterfall"}/></div>
//   //       <div><Sliders/></div>
//   //       <Hello/>
//   //
//   //
//   //     <Hello/>
//   //
//   //
//   //       <ArticleList articles={articles}></ArticleList>
//   //       <DemoList demos={demos}/>
//   //
//   //
//   //   </div>
//         return (
//      <div className="App">
//          <Route exact path="/" component={Home} />
//          <h1>abbd</h1>
//
//          {/*<Home />*/}
//      </div>
//
//   );
// }
//
// export default App;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*<Route path="Home" element={<Home />} />*/}
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Explore" element={<Explore />} />
          <Route path="Comparison" element={<Comparison />} />
          <Route path="OnePlace" element={<OnePlace />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="admin" element={<Admin />} />
          <Route path="showplaces" element={<ShowPlaces />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="Registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));

// const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
