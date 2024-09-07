import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import ProductDetails from "./pages/Productdetails";

const App = () => {
  const [user, setUser] = useState(null);

  //check jwt khi load web
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
          }
        })
        .catch((error) => {
          console.error("Authorized token failed", error);
          logout();
        });
    }
  }, []);

  const loadUserData = () => {
    api
      .get("/users/my-info")
      .then((response) => {
        setUser(response.data); //luu thong tin ng dung vao state
      })
      .catch((error) => {
        console.error("Khong the lay du lieu", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
