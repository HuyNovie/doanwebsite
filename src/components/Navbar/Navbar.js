import React from 'react';
import './Navbar.css';
import Logo from '../../assets/food/logo.png'
import { IoCartOutline,IoPersonCircleSharp } from "react-icons/io5";
import {animate, delay, m, motion} from "framer-motion";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const navMenu = [
    {
        id:1,
        title: "Home",
        path: "/",
        delay:0.1
    },
    {
        id:2,
        title: "About",
        path: "/about",
        delay:0.2
    },
    {
        id:3,
        title: "Menu",
        path: "/menu",
        delay:0.3
    },
    {
        id:4,
        title: "Delivery",
        path: "/deliver",
        delay:0.4
    },
    {
        id:5,
        title: "Contact",
        path: "/Contact",
        delay:0.5
    }

]

const SlideDown = (delay) => {
    return {
        initial: {
            y: "-100%",
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity:1,
            transition: {
                duration: 0.7,
                delay:delay,
            }
        }
    }
};
const Navbar = () =>{
    return (
        <Container fluid>
            <nav id="navbarid">
                <div className='nav-container' id="">
                    {/* Logo */}
                    <motion.img 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.9,delay: 0.5}}
                    src={Logo} alt='Logo' className='logo' />

                    {/* Menu */}
                    <div className='menu'>
                        <ul className='nav-menu'>
                            {navMenu.map((menu) =>{
                                return (
                                    <motion.li
                                    variants={SlideDown(menu.delay)}
                                    initial="initial"
                                    animate= "animate"
                                    key={menu.id} className='nav-items'
                                    data-delay={menu.delay} >
                                        <a href={menu.path} className='menu-title'>{menu.title}</a>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Button */}
                    <motion.div className='btn-nav'
                    variants={SlideDown(1)}
                    initial="initial"
                    animate= "animate">
                        <button className='btn-item card-item'>
                            <IoCartOutline />
                        </button>
                        <button className='btn-item singin-item'>
                            <IoPersonCircleSharp /> 
                        </button>
                    </motion.div>
                </div>
            </nav>
        </Container>
)};

export default Navbar;