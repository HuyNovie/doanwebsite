import React, { useState } from 'react';
import './Contact.css';
import { AiFillHeart } from "react-icons/ai";

const Contact = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (  
        <main className="container" style={{paddingTop: "150px"}}>
            <div className='row'>
                <div className='col-lg-6 col-md-12'>
                    <div className='boardContact'>
                        <p className='titleContact'>We'd love to hear from you <AiFillHeart /></p>
                        <div className='contactname'>Name:</div>
                        <input className='contactname' type='text'/>
                        <div className='contactemail'>Email:</div>
                        <input className='contactemail' type='email'/>
                        <div className='contactphone'>Phone:</div>
                        <input className='contactphone' type='phone'/>
                        <div className='contactnote'>Nội dung:</div>
                        <textarea rows={6} cols={40} className='contactnote'/>
                        <button className='buttonContact2'>Gửi thông tin</button>
                    </div>
                </div>
                <div className='col-lg-6 col-md-12'>
                    <div className='mapContact'>
                        <iframe className='map1' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4214534079097!2d106.69587925127134!3d10.855514598906382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175283eec1c7b83%3A0x5707ee0f49c589ca!2zQW4gUGjDuiDEkMO0bmcgMTAsIEFuIFBow7ogxJDDtG5nLCBRdeG6rW4gMTIsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1723622086691!5m2!1svi!2s" width="100%" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <iframe className='map2' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.459796992576!2d106.68803927480606!3d10.85259048930087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752847ac0afb83%3A0x1154eb1649bdb7db!2zQW4gUGjDuiDEkMO0bmcgMTAvMjAgSOG6u20gNywgS2h1IHBo4buRIDEsIFF14bqtbiAxMiwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1723625927868!5m2!1svi!2s" width="100%" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;
