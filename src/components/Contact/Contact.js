import { useState } from 'react';
import React from "react";
import FoodPng from "../../assets/food/food2-plate.png"
import Spoon from "../../assets/food/spoon.png"
import Banana from "../../assets/food/banana.png"
import Leaf from "../../assets/food/leaf.png"
import organic from "../../assets/food/organicFood.png"
import { IoCartOutline } from "react-icons/io5";
import "./Contact.css"
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';

const Contact = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return ( 
        <main>
            <div className='ContactTitle'>Giờ Mở Cửa & Đặt Bàn</div>
            <div className='backgroundContact'>
                <div className='thongtin'><br/><br/>
                <span className='note'>Giờ mở cửa</span><br/><br/>
                <span className='note1'>Tất cả các ngày lễ trong tuần( Bao gồm các lễ & tết )</span><br/><br/>
                <span className='note2'>Phục vụ (24/24)</span><br/><br/>
                <span className='note3'>Thông tin liên hệ đặt bàn:</span><br/><br/>
                <span className='phone'>Số điện thoại: 0902 444 666</span><br/><br/>
                <span className='address'>Địa chỉ: 300A Vườn Lài , phường 3 , Quận 12 </span><br/><br/>
                <Button type='button' name='buttonContact' className='buttonContact'>Đặt bàn ngay</Button>
            </div>
            </div>
        </main>
    )
}

export default Contact;