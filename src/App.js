import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if  (token) {
  //     fetch('http://localhost:8080/identity/auth/introspect', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type' : 'application/json',
  //         'Authorization' : `Bearer ${token}`,
  //       },
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       if(data.valid){
  //         setIsAuthenticated=(true);
  //       } else {
  //         localStorage.removeItem('token');
  //       }
  //     })
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
