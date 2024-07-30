import React from 'react';
import './Footer.css';
import Logo from '../../assets/food/logo.png'
import {motion} from "framer-motion";
import { Container, Col, Row } from 'react-bootstrap';

const listAbout = [
    {
        id:1,
        title:"abc, bcd, HCM, VIETNAM",
        path: "/location"
    },
    {
        id:2,
        title: "0373730397",
        path: "/phone"
    },
    {
        id:3,
        title: "example@example.com",
        path: "/mail"
    }

]

const footer = () => {
    return (
    <Container className='container-footer'>
      <Row>
        {/* Logo + TenNhaHang + DiaChi + sdt + mail */}
        <Col>
            <motion.div>
                <motion.img src={Logo} alt='Logo' className='logo' />

            </motion.div>
            <h1 className='res-name'>KOREAN-KUISINE</h1>
            <div className='About'>
                <ul className='list-about'>
                    {listAbout.map((about) =>{
                        return (
                            <motion.li
                             key={about.id} className='about-items'>
                                <a href={about.path} className='about-title'>{about.title}</a>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </Col>
        {/*  */}
        <Col>2 of 3</Col>
        {/* Lien he + mang xa hoi */}
        <Col>3 of 3</Col>
      </Row>
    </Container>
)};

export default footer;