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
import ManageBookings from "./components/ManagerBooking";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/Productdetails";
import Loading from './components/Loading/Loading';
import Payment from "./pages/Payment";
import UserBooking from "./components/UserBooking";
import Contact from "./pages/Contact";
import Introduce from "./pages/Introduce";
import AdminProfile from "./components/AdminProfile";
import CustomerProfile from './components/CustomerProfile';
import PaymentConfirmation from "./pages/PaymentConfirmation";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import UserManagement from "./components/UserManagement";
import EditProfile from "./components/EditProfile";
import MyOrders from "./components/MyOrders";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
  
    if (jwtToken) {
      api
        .get("auth/introspect", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((response) => {
          if (response.data.result.valid) {
            loadUserData();
          } else {
            console.log("Token hết hạn");
            localStorage.removeItem("jwtToken");
            logout();
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Authorized token failed", error);
          localStorage.removeItem("jwtToken");
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  const loadUserData = () => {
    const jwtToken = localStorage.getItem("jwtToken");
  
    if (jwtToken) {
      api
        .get("/users/my-info", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((response) => {
          console.log("User data:", response.data.result);
          setUser(response.data.result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Không thể lấy dữ liệu", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:productType/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/customer/user-Booking" element={<UserBooking/>} />
          <Route path="/admin/manager-booking" element={<ManageBookings />} />
          <Route path="/admin/product-management" element={<ProductManagement />} />
          <Route path="/admin/view-products" element={<ProductManagement />} />
          <Route path="/admin/order-management" element={<OrderManagement />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/customer" element={<CustomerProfile />} />
          <Route path="/customer/edit-profile" element={<EditProfile />} />
          <Route path="/customer/my-orders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
