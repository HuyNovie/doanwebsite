import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import Logo from "../../assets/food/logo.png";
import { motion } from "framer-motion";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUser, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { formatCurrency } from "../../helpers/common";

const navMenu = [
  { id: 1, title: "Trang chủ", path: "/", delay: 0.1 },
  { id: 2, title: "Đặt bàn", path: "/booking", delay: 0.2 },
  { id: 3, title: "Thực đơn", path: "/menu", delay: 0.3 },
  { id: 4, title: "Giới thiệu", path: "/introduce", delay: 0.4 },
  { id: 5, title: "Liên hệ", path: "/contact", delay: 0.5 },
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, delay } },
});

const Navbar = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIcon, setUserIcon] = useState(<FaUser />);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (jwtToken) {
      setIsLoggedIn(true);
      if (user) {
        setUserName(user.username || ""); 
        setUserIcon(user.roles && user.roles.includes("ADMIN") ? <FaUserCircle /> : <FaUser />);
      }
    } else {
      setIsLoggedIn(false);
      setUserIcon(<FaUser />);
    }
  }, [user, jwtToken]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const { cartItems, cartQty, totalPrice } = useShoppingContext();

  const [smallNavbar, setSmallNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSmallNavbar(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div id="navbar" className={`navbar ${smallNavbar ? "small" : ""}`}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        src={Logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <button ref={buttonRef} className="menu-toggle" onClick={toggleMenu}>
        <TfiMenu />
      </button>
      <div ref={menuRef} className={`menu ${menuOpen ? "active" : ""}`}>
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
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  isActive ? "menu-title active" : "menu-title"
                }
              >
                {menu.title}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
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
          <Dropdown.Menu align="end" className="cart-dropdown p-3">
            <ul aria-labelledby="navbarDropdownCart">
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
                      {cartItems?.length > 0 ? (
                        cartItems.map((item) => (
                          <tr key={item.productId}>
                            <td>
                              <img
                                src={`http://localhost:8080/restaurant/images/${item.imageUrl}`} 
                                className='img-fluid rounded'
                                alt={item.productName || 'Tên món không có'}
                                style={{ width: "100px", height: "auto" }}
                                onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = 'path_to_fallback_image'; 
                                }}
                              />
                            </td>
                            <td>{item.productName || 'Tên món không có'}</td>
                            <td>{formatCurrency(item.unitPrice || 0)}</td>
                            <td>{item.quantity || 0}</td>
                            <td>
                              {formatCurrency((item.unitPrice || 0) * (item.quantity || 0))}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>Giỏ hàng trống</td>
                        </tr>
                      )}
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
              <Link to="/profile">{userIcon} {userName}</Link>
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
