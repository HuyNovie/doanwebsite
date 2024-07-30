
import React from "react";
import FoodPng from "../../assets/food/food.png"
import Spoon from "../../assets/food/spoon.png"
import Banana from "../../assets/food/banana.png"
import Leaf from "../../assets/food/leaf.png"
import organic from "../../assets/food/organicFood.png"
import { IoCartOutline} from "react-icons/io5";
import "./Slider.css"
const Slider = () => {
  return (
    <main>
      <div className="container">
        <div className="slider">
            {/* text content */}
            <div className="content">
                <h1 className="text-content text-content-items" >
                    KOREAN-KUISINE
                    <img src={Leaf} alt="" className="img-content"/>
                </h1>
                <h1 className="text-content">restaurant</h1>
                <p className="text-content-main">
                  Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu,
                  tận tâm phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất.
                </p>
                <button>
                    <IoCartOutline />
                </button>
            </div>
            {/* Images here */}
        </div>
        </div>  
    </main>
  )
}

export default Slider;