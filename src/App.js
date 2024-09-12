import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import api from "./api/axios";
import { logout } from "./services/authService";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/Productdetails";
import Loading from './components/Loading/Loading';
import Payment from "./pages/Payment";
// <<<<<<< HEAD
import Contact from "./pages/Contact";
import Introduce from "./pages/Introduce";
// =======
import AdminProfile from './pages/AdminProfile'; 
// >>>>>>> 6d3b1199a7605639f3880d0b0d3d1d48671e6bae

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // check jwt khi load web
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      api
        .get("auth/introspect", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.result.valid) {
            loadUserData();
          } else {
            console.log("Token hết hạn");
            logout();
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Authorized token failed", error);
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserData = () => {
    api
      .get("/users/my-info")
      .then((response) => {
        setUser(response.data); // lưu thông tin người dùng vào state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Không thể lấy dữ liệu", error);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/introduce" element={<Introduce/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/admin" element={<AdminProfile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
