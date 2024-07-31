import './Footer.css';
import Logo from '../../assets/food/logo.png'
import location from '../../assets/imgLocation.png'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import 'bootstrap/dist/css/bootstrap.min.css';

const listAbout = [
    {
        id:1,
        icon: <FaMapMarkerAlt />,
        name: "Cơ sở 1: ",
        title:"10/10 An Phú Đông, An Phú Đông, Q.12, Việt Nam",
        path: "/location"
    },
    {
      id:1,
      icon: <FaMapMarkerAlt />,
      name: "Cơ sở 2: ",
      title:"20/10 An Phú Đông, An Phú Đông, Q.12, Việt Nam",
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

const listLink = [
  {
    id:1,
    title:"Về chúng tôi",
    path:"/"
  },
  {
    id:2,
    title:"Thực đơn",
    path:"/"
  },
  {
    id:3,
    title:"Đặt bàn",
    path:"/"
  },
  {
    id:4,
    title:"Tuyển dụng",
    path:"/"
  },
  {
    id:5,
    title:"Tin tức",
    path:"/"
  }
]

const listFanpage = [
  {
    id:1,
    icon: <FaFacebookF />,
    path:""
  },
  {
    id:2,
    icon: <SiTiktok />,
    path:""
  },
  {
    id:3,
    icon: <FaFacebookF />,
    path:""
  }
]

const Footer = () => {
    return (
      <Container fluid className="footer-container mt-4">
        <Row>
          <Col className="footer-section d-flex justify-content-center">
            <Col xs={2} md={2}  className="footer-logo">
              <img src={Logo} alt='Logo' className='logo' />
              <h1 className='res-name'>KOREAN KUISINE</h1>
            </Col>
            <Col xs={2} md={2}>
              <div className="vertical-hr"></div>
            </Col>
            <Col xs={8} md={8} className='footer-slogan'>
              <p className='text-slogan'>
                Với mong muốn luôn luôn lắng nghe và phát triển, chúng tôi rất vui và lấy làm vinh dự khi được bạn góp ý – đánh giá về 
                dịch vụ của mình. Chúng tôi sẽ tiếp thu và phát triển dịch vụ hoàn thiện hơn từng ngày.
              </p>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} className="footer-section">
            <h3 className='res-title'>Liên Hệ</h3>
            <ul className='list list-about'>
              {listAbout.map((about) => (
                <li key={about.id} className='li-items'>
                  <span className='li-icon'>{about.icon} </span>
                  <a href={about.path} className='li-title'>
                    <span className='li-name'>{about.name}</span> {about.title}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={6} md={4} className="footer-section">
            <h3 className='res-title'>Liên kết</h3>
            <ul className='list list-link'>
              {listLink.map((link) => (
                <li key={link.id} className='li-items'>
                  <a href={link.path} className='li-title'>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={6} md={4} className="footer-section">
            <h3 className='res-title'>Fanpage</h3>
            <ul className='list list-link'>
              {listFanpage.map((fanpage) => (
                <li key={fanpage.id} className='li-items'>
                  <a href={fanpage.path} className='li-title red'>
                    {fanpage.icon}
                  </a>
                </li>
              ))}
            </ul>
            <Row>
              <h3 className='res-title'>Bản đồ</h3>
              <Col>
                <img src={location} className='location'/>
                <h4>Cơ sở 1</h4>
              </Col>
              <Col>
                <img src={location} className='location'/>
                <h4>Cơ sở 2</h4>
              </Col>
            </Row>
            
          </Col>
        </Row>
        <Row>
          <Col><hr /></Col>
        </Row>
        <Row>
          <Col>
            <h5 className='text-copyright text-center'>© Copyright 2024 by Korean-Kuisine restaurant. All Rights Reserved.</h5>
          </Col>
        </Row>
      </Container>
    );
  };
  

export default Footer;