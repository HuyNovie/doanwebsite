import React from "react";
import Slider from "../components/Slider/Slider"
import Contact from "../components/Contact/Contact";
import Food from "../components/Food/Food";


const Home = () => {
    return (
      <div>
        <Slider />
        <Food />
        <Contact />
      </div>
    );
  }
  
  export default Home;