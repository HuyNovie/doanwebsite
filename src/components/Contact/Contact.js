import { useState } from 'react';
import React from "react";
import "./Contact.css"
import { Link } from "react-router-dom";
import { Input } from "antd";
import new1 from "../../assets/Banner/newbanhrang.jpg"
import new2 from "../../assets/Banner/newgaham.jpg"
import new3 from "../../assets/Banner/newdarkdoritang.jpg"

const Contact = () => {
    return ( 
      <>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-12'>
            <div className='backgroup-contact'>
              <div className='t-title'>
                <hr className='hr-degisn'/>
                <h5><span> Korean Kuisine</span></h5>
                <h1><span>Liên Hệ</span></h1>
                <div className='t-content'>
                  <span>Korean Kuisine luôn luôn đón chào quý khách!</span>
                </div>
                <div className='button-contact'>
                  <Link to="/booking" className="button-see-contact" onClick={() => window.scrollTo(0, 0)}> 
                      <span>Đặt bàn</span>
                  </Link>
                  <Link to="/contact" className="button-see-contact" onClick={() => window.scrollTo(0, 0)}> 
                      <span>Liên Hệ</span>
                  </Link>
                </div>
              </div>
            </div>     
          </div> 
          <div className='col-lg-4 col-md-12'>
            <div className='time-open'>
              <h1><span>Giờ mở cửa</span></h1>
              <div className='ts-time'>
                <div><span className='day-time'>Thứ 2 - Thứ 7</span></div>
                <div>10 <span style={{color:"orange"}}>:</span> 00</div>
                <div>23 <span style={{color:"orange"}}>:</span> 30</div>
              </div>
              <div className='ts-time'>
                <div><span className='day-time'>Thứ 7 - CN</span></div>
                <div>10 <span style={{color:"orange"}}>:</span> 00</div>
                <div>22 <span style={{color:"orange"}}>:</span> 00</div>
              </div>
            </div>
          </div>    
         <div className='news-new row'>
          <div className='news-new-title'>
            <hr style={{width:"40px",border:"3px solid rgb(215, 165, 65)",margin:"10px auto"}}/>
            <h6><span>News</span></h6>
            <h1><span>Tin tức mới nhất</span></h1>
            <div><span>Các tin tức, thông tin khuyến mãi mới nhất sẽ được cập nhật liên tục đến với quý khách</span></div>
          </div>
         <div className='col-lg-4 col-md-12'>
            <div className='news'>
              <img src={new1} className="news-img" alt='newbanhrang' />
              <h5 className='news-title'><span>Bánh rán Hàn Quốc - món đường phố được du khách yêu thích</span></h5>
              <div className='news-content'><span>Ngon, rẻ và nóng hổi là những từ được nhiều du khách miêu tả khi nói về hotteok - loại bánh rán được bày bán nhiều ở đường phố tại Hàn Quốc.</span></div>
              <a className="news-link" href="https://vnexpress.net/banh-ran-han-quoc-mon-duong-pho-duoc-du-khach-yeu-thich-4747803.html" target="_blank" rel="noopener noreferrer">Đọc thêm</a>
              <div className='news-time'><span>21/5/2024</span></div>
            </div>
         </div>
         <div className='col-lg-4 col-md-12'>
            <div className='news'>
              <img src={new2} className="news-img" alt='newga' />
              <h5 className='news-title'><span>Gà hầm sâm - món ăn nóng hổi được yêu thích ngày hè</span></h5>
              <div className='news-content'><span>Không chỉ là món ăn nổi tiếng, gà hầm sâm còn được người dân địa phương đặc biệt yêu thích dùng trong mùa hè. Thậm chí tại Hàn Quốc còn có ngày dành riêng để ăn món này, đó là 3 ngày nóng nhất năm (được gọi là sambok). Vào sambok, hàng nghìn người sẵn sàng xếp hàng dọc các quán bán samgyetang khắp nước để đợi ăn gà hầm sâm.</span></div>
              <a className="news-link" href="https://vnexpress.net/ga-ham-sam-mon-an-nong-hoi-duoc-yeu-thich-ngay-he-4740298.html" target="_blank" rel="noopener noreferrer">Đọc thêm</a>
              <div className='news-time'><span>2/5/2024</span></div>
            </div>
         </div>
         <div className='col-lg-4 col-md-12'>
            <div className='news'>
              <img src={new3} className="news-img" alt='newdarkdoritang' />
              <h5 className='news-title'><span>Dakdoritang, Hàn Quốc - Món cay được nhiều người biết đến</span></h5>
              <div className='news-content'><span>Kim chi có thể là món cay được nhiều người biết đến khi nhắc đến ẩm thực Hàn Quốc. Nhưng nếu bạn muốn ăn một món mặn với nguyên liệu bổ dưỡng và hương vị cay nồng từ ớt cho những ngày đông sắp tới, dakdoritang là gợi ý</span></div>
              <a className="news-link" href="https://vnexpress.net/nhung-mon-an-cay-noi-tieng-the-gioi-4533584.html" target="_blank" rel="noopener noreferrer">Đọc thêm</a>
              <div className='news-time'><span>1/5/2024</span></div>
            </div>
         </div>
         </div>
         <div className='col-lg-12'>
                <div className='newsletter'>
                <hr className='hr-degisn'/>
                  <h5><span> Newsletter</span></h5>
                  <h1><span>Đăng ký nhận tin</span></h1>
                  <div className='t-content'>
                    <span>Quý khách để lại email đăng ký thông nhận tin mới nhất của Korean Kuisine!</span>
                  </div>
                  <form>
                  <Input type="email" class="newsletter-input" name="mail" className='newsletter-input'placeholder="Enter your email" required title="Please enter a valid email address"/>
                  <button type="submit" className='newsletter-button'>Submit</button>
                </form>
              </div>    
         </div>
        </div>
      </div>
        </>
    )
}

export default Contact;