import React from "react";
import '../App.css';
import {useState, useEffect} from 'react'
import ArticleList from '../Components/ArticleList';
import DemoList from "../Components/DemoList";
import Hello from "../Components/Hello";
import Sliders from "../Components/auto_slider/Sliders";
import pic from "../images/homepage.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIService from "../APIService";
import SearchBar from "../Components/Search_bar";

function Home() {
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
        <div id = "clearDiv"  className = "img"><img src={pic}   alt={"waterfall"}/></div>
        <SearchBar/>
        <div><h3> Top five places </h3></div>
        <div><Sliders/></div>
        <div><h3> Top five spots </h3></div>
        <div><Sliders/></div>
        <div><h3> Top five foods </h3></div>
        <div><Sliders/></div>
        <div><h3> Top five activities </h3></div>
        <div><Sliders/></div>
        <Hello/>
        <ArticleList articles={articles}></ArticleList>
        <DemoList demos={demos}/>
    </div>
  );
}

export default Home;