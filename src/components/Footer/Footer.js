import './Footer.css';
import Logo from '../../assets/food/logo.png'
import {motion} from "framer-motion";
import { Container, Col, Row } from 'react-bootstrap';

const listAbout = [
    {
        id:1,
        title:"Location: abc, bcd, HCM, VIETNAM",
        path: "/location"
    },
    {
        id:2,
        title: "Hotline: 0373730397",
        path: "/phone"
    },
    {
        id:3,
        title: "Email: example@example.com",
        path: "/mail"
    }

]

const footer = () => {
    return (
    <Container className='container-footer'>
        <Row>
            <Col xs={8} md={12}>
                <motion.div>
                    <motion.img src={Logo} alt='Logo' className='logo' />
                    <h1 className='res-title res-name'>KOREAN-KUISINE</h1>
                </motion.div> 
                <p>
                Với mong muốn luôn luôn lắng nghe và phát triển, 
                chúng tôi rất vui và lấy làm vinh dự khi được bạn góp ý – đánh giá về 
                dịch vụ của mình.
                Chúng tôi sẽ tiếp thu và phát triển dịch vụ hoàn thiện hơn từng ngày.
                </p>
            </Col>
        </Row>
        <Row>
            {/* Logo + TenNhaHang + DiaChi + sdt + mail */}
            <Col xs={6} md={4}>
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
            <Col xs={6} md={4}> 
                <h1 className='res-title res-about'>Về chúng tôi</h1>
            </Col>
            {/* Lien he + mang xa hoi */}
            <Col xs={6} md={4}>
                <h1 className='res-title res-contact'>Liên Hệ</h1>
                <div className='list-contact'>
                    <button className='list-contact-facebook' href=""></button>
                    <button className='list-contact-zalo' href=""></button>
                    <button className='list-contact-tiktok' href=""></button>
                </div>
            </Col>
        </Row>
        <Row>
            <Col><hr></hr></Col>
        </Row>
        <Row>
            <h5 className='text-coppyright'>© Copyright 2024 by Korean-Kuisine restaurant. All Rights Reserved.</h5>
        </Row>
    </Container>
)};

export default footer;