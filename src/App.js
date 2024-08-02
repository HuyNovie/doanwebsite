import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
