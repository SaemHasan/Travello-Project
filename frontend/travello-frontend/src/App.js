import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './Components/ArticleList';
import DemoList from "./Components/DemoList";
import Hello from "./Components/Hello";
import Navbar from "./Components/Navbar.js";
import Explore_slider from './Components/explore_slider';
import pic from "./images/homepage.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIService from "./APIService";


import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import About from "./About";

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
//   //       <div><Explore_slider/></div>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));