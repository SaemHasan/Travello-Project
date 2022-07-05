import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './Components/ArticleList';
import DemoList from "./Components/DemoList";
import Hello from "./Components/Hello";
import Navbar from "./Components/Navbar.js";
import pic from "./images/homepage.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIService from "./APIService";

function App() {
    const [articles, setArticles] = useState([])
    const [demos, setDemos] = useState([])

    useEffect(() => {
        APIService.GetArticles()
            .then(resp => setArticles(resp))
            .catch(error => console.log(error))
  }, [])

    useEffect(()=>{
        APIService.GetDemo()
            .then(resp => setDemos(resp))
            .catch(error => console.log(error))
    },[])


  return (
    <div className="App">
        <div><Navbar /></div>
        <div id = "clearDiv"  className = "img"><img src={pic}   alt={"waterfall"}/></div>
      <Hello/>

        <ArticleList articles={articles}></ArticleList>
        <DemoList demos={demos}/>

    </div>

  );
}

export default App;
