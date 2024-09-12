import React from "react";
import Slider from "../components/Slider/Slider"
import Characteristic from "../components/Characteristic/Characteristic"
import Introduce from "../components/Introduce/Introduce"
import Contact from "../components/Contact/Contact"


const Home = () => {
    return (
      <div className="background">
        <Slider />
        <Introduce/>
        <Characteristic/>
        <Contact/>
  
      </div>
    );
  }
  
  export default Home;