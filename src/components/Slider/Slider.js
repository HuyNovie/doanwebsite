import { useState } from "react";
import React from "react";
import FoodPng from "../../assets/food/food2-plate.png";
import Leaf from "../../assets/food/leaf.png";
import { IoCartOutline } from "react-icons/io5";
import "./Slider.css";
import Carousel from "react-bootstrap/Carousel";

// controlled carousel cua boostrap

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <main>
      <div className="container">
        <div className="slider">
          {/* text content */}
          <div className="content">
            <h1 className="text-content text-content-items">
              KOREAN KUISINE
              <img src={Leaf} alt="" className="img-content" />
            </h1>
            <p className="text-content-main">
              Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm
              phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất.
            </p>
            <button>
              <div className="cart-outline">
                <IoCartOutline />
              </div>
            </button>
          </div>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            data-bs-theme="dark"
            slide
            touch="true"
          >
            <Carousel.Item>
              <img src={FoodPng} alt="Food Plate" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={FoodPng} alt="Food Plate" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={FoodPng} alt="Food Plate" />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </main>
  );
};

export default Slider;
