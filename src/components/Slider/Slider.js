import { useState } from "react";
import React from "react";
import Leaf from "../../assets/food/leaf.png";
import { IoCartOutline } from "react-icons/io5";
import "./Slider.css";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/Banner/openTime.png";
import banner2 from "../../assets/Banner/booking.png";
import banner3 from "../../assets/Banner/ship.png";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleToMenu = () => {
    navigate("/menu");
  }

  return (
    <>
      <div className="container">
        <div className="row pd-slider">
          <div className="col-lg-4 col-md-12 col-sm-12 pd-bottom order-2 order-md-2 order-lg-1">
            <div className="content">
              <h1 className="text-content text-content-items">
                KOREAN KUISINE
                <img src={Leaf} alt="leaf" className="img-content" />
              </h1>
              <p className="text-content-main">
                Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận
                tâm phục vụ, mang lại cho khách hàng những trải nghiệm tuyệt với
                nhất.
              </p>
              <button>
                <div className="cart-outline" onClick={handleToMenu}>
                  <IoCartOutline />
                </div>
              </button>
            </div>
          </div>

          <div className="col-lg-8 col-md-12 col-sm-12 order-1 order-md-1 order-lg-2 slider-img">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              data-bs-theme="dark"
              slide={true}
            >
              <Carousel.Item>
                <img
                  src={banner1}
                  alt="Food Plate"
                  className="banner-img"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={banner2}
                  alt="Food Plate"
                   className="banner-img"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={banner3}
                  alt="Food Plate"
                   className="banner-img"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
