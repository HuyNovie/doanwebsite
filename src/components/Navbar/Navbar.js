import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/food/logo.png";
import { IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navMenu = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Đặt bàn",
    path: "/about",
    delay: 0.2,
  },
  {
    id: 3,
    title: "Thực đơn",
    path: "/menu",
    delay: 0.3,
  },
  {
    id: 4,
    title: "Vận chuyển",
    path: "/deliver",
    delay: 0.4,
  },
  {
    id: 5,
    title: "Liên hệ",
    path: "/contact",
    delay: 0.5,
  },
];

const SlideDown = (delay) => {
  return {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: delay,
      },
    },
  };
};

const Navbar = () => {
  // Điều hướng tới trang login
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  // add class small cho navbar nho lai khi scroll trang
  const [smallNavbar, setSmallNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSmallNavbar(true);
      } else {
        setSmallNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="navbar" className={`navbar ${smallNavbar ? "small" : ""}`}>
      {/* Logo */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        src={Logo}
        alt="Logo"
        className="logo"
      />

      {/* Menu */}
      <div className="menu">
        <ul className="nav-menu">
          {navMenu.map((menu) => {
            return (
              <motion.li
                variants={SlideDown(menu.delay)}
                initial="initial"
                animate="animate"
                key={menu.id}
                className="nav-items"
                data-delay={menu.delay}
              >
                <a href={menu.path} className="menu-title">
                  {menu.title}
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Button */}
      <motion.div
        className="btn-nav"
        variants={SlideDown(1)}
        initial="initial"
        animate="animate"
      >
        <button className="btn-item card-item">
          <IoCartOutline />
        </button>
        <button className="btn-item singin-item" onClick={goToLogin}>
          <IoPersonCircleSharp />
        </button>
      </motion.div>
    </div>
  );
};

export default Navbar;
