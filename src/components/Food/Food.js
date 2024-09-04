import { useState } from "react";
import React from "react";
import tokbokki from "../../assets/food/tokbokki.png";
import soupkimchi from "../../assets/food/soupkimchi.png";
import gacayphomai from "../../assets/food/gacayphomai.png";
import ricemix from "../../assets/food/ricemix.png";
import { IoCartOutline } from "react-icons/io5";
import "./Food.css";

// controlled carousel cua boostrap

const Food = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <main>
      <h2 className="FoodTitle">Món Ăn Đặc Biệt:</h2><br/>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
          <img src={ricemix} alt="image-food" className="image_rice"></img>
          </div>
          <div className="col-lg-7">
          <a href="#" className="food-1"><br/>Cơm Trộn Hàn Quốc Sốt Kuisine</a><br/><br/>
            <a href="#" className="food-1">Size M : 60K</a><br/>
            <a href="#" className="food-1">Size L : 85K</a><br/><br/>
            <p className="ingredientleft"><span className="ingredientleft">Nguyên liệu :</span> Cơm, thịt bò, thịt heo, trứng, kim chi,các loại rau và nấm, ...</p>
          </div>
        </div><br/><hr className="trai"/>
        <div className="row">
          <div className="col-lg-8">
            <br/><a href="#" className="food-2">Soup Kim Chi Thịt Bằm Hàn Quốc</a><br/><br/>
            <a href="#" className="food-2-size">Size M : 50K</a><br/>
            <a href="#" className="food-2-size">Size L : 65K</a><br/><br/>
            <p className="ingredientright"><span className="ingredientright">Nguyên liệu :</span> Thịt bằm, tôm, tàu hủ, kim chi và các công thức tuyệt mỹ của KUISINE, ...</p>
          </div>
          <div className="col-lg-4">
          <img src={soupkimchi} alt="image_food" className="image_soup"></img>
          </div>
        </div><br/><hr className="phai"/>
          <div className="row">
          <div className="col-lg-5">
          <img src={tokbokki} alt="image-food" className="image_tokbokki"></img>
          </div>
          <div className="col-lg-7">
          <a href="#" className="food-3"><br/>Bánh Gạo Tokbokki Sốt đặc biệt</a><br/><br/>
            <a href="#" className="food-3">Size M : 40K</a><br/>
            <a href="#" className="food-3">Size L : 55K</a><br/><br/>
            <p className="ingredientleft"><span className="ingredientleft">Nguyên liệu :</span> Bánh gạo, chả cá, phô mai sợi, nước sốt KUISINE, ...</p>
          </div>
        </div><br/><hr className="trai"/>
        <div className="row">
          <div className="col-lg-8">
            <br/><a href="#" className="food-4">Gà Cay Phô Mai Hàn Quốc</a><br/><br/>
            <a href="#" className="food-4-size">Size M : 70K</a><br/>
            <a href="#" className="food-4-size">Size L : 100K</a><br/><br/>
            <p className="ingredientright"><span className="ingredientright">Nguyên liệu :</span> Miếng gà không xương, phô mai sợi, phô mai lát, bắp cải, sốt KUISINE, ...</p>
          </div>
          <div className="col-lg-4">
          <img src={gacayphomai} alt="image_food" className="image_gacayphomai"></img>
          </div>
        </div><br/><hr className="phai"/>
        </div>
        
    </main>
  )}

  export default Food;