import './Footer.css';
import Logo from '../../assets/food/logo.png'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const listAbout = [
    {
        id:1,
        icon: <FaMapMarkerAlt />,
        name: "Location: ",
        title:"10/10 An Phú Đông, An Phú Đông, Q.12, Việt Nam",
        path: "/location"
    },
    {
        id:2,
        icon: <FaPhone />,
        name: "Phone Number: ",
        title: "0373730397",
        path: "/phone"
    },
    {
        id:3,
        icon: <FaEnvelope />,
        name: "Email: ",
        title: "koreankuisine@gmail.com",
        path: "/mail"
    }

]

const Footer = () => {
    return (
      <Container fluid className="footer-container">
        <Row>
          <Col xs={12} md={4} className="footer-section">
            <div className="footer-logo">
              <img src={Logo} alt='Logo' className='logo' />
              <h1 className='res-title res-name'>KOREAN-KUISINE</h1>
            </div>
            <p>
              Với mong muốn luôn luôn lắng nghe và phát triển, chúng tôi rất vui và lấy làm vinh dự khi được bạn góp ý – đánh giá về 
              dịch vụ của mình. Chúng tôi sẽ tiếp thu và phát triển dịch vụ hoàn thiện hơn từng ngày.
            </p>
          </Col>
          <Col xs={12} md={4} className="footer-section">
            <h3 className='res-title'>Về chúng tôi</h3>
            <ul className='list list-about'>
              {listAbout.map((about) => (
                <li key={about.id} className='about-items'>
                  <a href={about.path} className='about-title'>
                    {about.icon} <span className='about-name'>{about.name}</span> {about.title}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={12} md={4} className="footer-section">
            <h3 className='res-title'>Liên Hệ</h3>
            <div className='list-contact'>
              <button className='facebook'> <FaFacebookF /></button>
              <button className='tiktok'> <SiTiktok /></button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col><hr /></Col>
        </Row>
        <Row>
          <Col>
            <h5 className='text-copyright'>© Copyright 2024 by Korean-Kuisine restaurant. All Rights Reserved.</h5>
          </Col>
        </Row>
      </Container>
    );
  };
  

export default Footer;