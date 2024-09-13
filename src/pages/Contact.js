import React, { useState } from 'react';
import './Contact.css';
import bannerContact from "../../src/assets/Banner/bannerContact.gif";

const Contact = () => {

    return (  
        <main className="container" style={{paddingTop: "25px"}}>
            <div className='backgroundContact'>
            <div className='row'>
                <div className='col-lg-4 col-md-12 order-2 order-md-2 order-lg-1'>
                    <div className='boardContact'>
                        <p className='titleContact'><h1>Liên Hệ</h1></p>
                        <div className='contactname'><h6>Họ Tên:</h6></div>
                        <input className='contactname' type='text'/>
                        <div className='contactemail'><h6>Email:</h6></div>
                        <input className='contactemail' type='email'/>
                        <div className='contactphone'><h6>Điện Thoại:</h6></div>
                        <input className='contactphone' type='phone'/>
                        <div className='contactnote'><h6>Nội Dung:</h6></div>
                        <textarea rows={6} cols={40} className='contactnote'/>
                        <button className='buttonContact2'>Gửi Thông Tin</button>
                    </div>
                </div>    
                <div className='col-lg-8 col-md-12 order-1 order-md-1 order-lg-2'>
                    <div className='mapContact'>
                        <img src={bannerContact} width={636} height={300} className='bannerContact'></img>
                        <iframe className='map1' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4214534079097!2d106.69587925127134!3d10.855514598906382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175283eec1c7b83%3A0x5707ee0f49c589ca!2zQW4gUGjDuiDEkMO0bmcgMTAsIEFuIFBow7ogxJDDtG5nLCBRdeG6rW4gMTIsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1723622086691!5m2!1svi!2s" width={636} height={300} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;