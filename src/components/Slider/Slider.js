import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Leaf from "../../assets/food/leaf.png";
import { IoCartOutline } from "react-icons/io5";
import "./Slider.css";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/Banner/booking.png"

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    <div className="container">
    <div className="row pd-slider">
      <div className="col-lg-4 col-md-12 col-sm-12 pd-bottom ">
        <div className="content">
        <h1 className="text-content text-content-items">
            KOREAN KUISINE
          <img src={Leaf} alt="leaf" className="img-content" />
       </h1>
       <p className="text-content-main">
          Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm
          phục vụ, mang lại cho khách hàng những trải nghiệm tuyệt với nhất.
        </p>
        <button>
        <Link to="/menu" className="cart-outline">
             <IoCartOutline />
        </Link>
        </button>
        </div>
      </div>
      <div className="col-lg-8 col-md-12 col-sm-12">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme="dark"
        slide={true}
      >
        <Carousel.Item>
          <img src={banner1 } alt="Food Plate" style={{ width: '100%', height: '440px', objectFit: 'cover' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner1} alt="Food Plate" style={{ width: '100%', height: '440px', objectFit: 'cover' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={banner1} alt="Food Plate" style={{ width: '100%', height: '440px', objectFit: 'cover' }} />
        </Carousel.Item>
      </Carousel>


      </div>
    </div>
    </div>
    </>
  );
};

export default Slider;

