import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./home/Home";
import About from "./About";
import Login from "./login/Login";
import Registration from "./Registration/Registration";
import Explore from "./Explore/Explore";


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

        </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />

      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));