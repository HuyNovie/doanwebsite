import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/food/logo.png";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import CartItems from "../Cart/CartItems";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { formatCurrency } from "../../helpers/common";
import { FaUser, FaSignInAlt } from "react-icons/fa";

const navMenu = [
  { id: 1, title: "Trang chủ", path: "/", delay: 0.1 },
  { id: 2, title: "Đặt bàn", path: "/booking", delay: 0.2 },
  { id: 3, title: "Thực đơn", path: "/menu", delay: 0.3 },
  { id: 4, title: "Vận chuyển", path: "/deliver", delay: 0.4 },
  { id: 5, title: "Liên hệ", path: "/contact", delay: 0.5 },
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, delay } },
});

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Khai báo navigate ở đây

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const { cartItems, cartQty, totalPrice } = useShoppingContext();

  // add class small cho navbar nho lai khi scroll trang
  const [smallNavbar, setSmallNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSmallNavbar(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          {navMenu.map((menu) => (
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
          ))}
        </ul>
      </div>

      {/* Button */}
      <motion.div
        className="btn-nav"
        variants={SlideDown(1)}
        initial="initial"
        animate="animate"
      >
        <Dropdown>
          <Dropdown.Toggle className="btn-item card-item">
            <IoCartOutline />
            {cartQty > 0 && (
              <span className="position-absolute top-0 start-1 badge badge-pill bg-danger">
                {cartQty}
              </span>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <ul
              className="dropdown-menu-end cart-dropdown p-3"
              aria-labelledby="navbarDropdownCart"
            >
              <li>
                <h3 className="dropdown-item">Giỏ hàng của tôi</h3>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {cartItems.map((item) => (
                        <CartItems key={item.id} {...item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
              <li className="d-flex justify-content-between align-items-center">
                <span className="ms-2">
                  <strong>Tổng tiền: </strong>
                  <strong className="text-danger px-2">
                    {formatCurrency(totalPrice)}
                  </strong>
                </span>
                <Link to="/checkout" className="btn btn-sm btn-success me-2">
                  Kiểm tra
                </Link>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <FaUser />
              </Link>
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <Link to="/login">
              <FaSignInAlt />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
