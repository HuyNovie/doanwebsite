import React, { useState } from "react";
import "./Login_Register.css";
import { login } from "../services/authService";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    usernameOrMailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameOrMailOrPhoneError: "",
    passwordError: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  const validateData = (name, value) => {
    let error = "";
    if (!value) {
      error = "Vui lòng điền vào mục này.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: error,
    }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    validateData(name, value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValid = validateData("usernameOrMailOrPhone", user.usernameOrMailOrPhone);
    const passwordValid = validateData("password", user.password);
  
    if (usernameValid && passwordValid) {
      try {
        const response = await login(user.usernameOrMailOrPhone, user.password);
        if (response && response.data?.result?.authenticated) {
          loadUserData();
          localStorage.setItem("jwtToken", response.data.result.token);
          console.log("Login successful:");
          navigate("/");
        } else if (response.data.code === 1005) {
          setErrorMessage("Tài khoản không tồn tại");
        } else if (response.data.code === 1006) {
          setErrorMessage("Mật khẩu không chính xác!");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Vui lòng thử lại sau");
      }
    }
  };
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
          localStorage.setItem("user", JSON.stringify(response.data.result));
        })
        .catch((error) => {
          console.error("Không thể lấy dữ liệu", error);
        });
    } else {
      console.log("load user fail")
    }
  };
  

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Đăng nhập</h1>
        
        <div className="form-group">
          <Input
            type="text"
            onChange={handleChange}
            name="usernameOrMailOrPhone"
            status={errors.usernameOrMailOrPhoneError ? "error" : ""}
            placeholder="Email/Tên tài khoản/Số điện thoại"
          />
          <span className="items-form">
            <FaUser />
          </span>
          {errors.usernameOrMailOrPhoneError && <p className="error-message">{errors.usernameOrMailOrPhoneError}</p>}
        </div>

        <div className="form-group">
          <Input
            type={passwordShown ? "text" : "password"}
            onChange={handleChange}
            status={errors.passwordError ? "error" : ""}
            name="password"
            placeholder="Mật khẩu"
          />
          <span onClick={togglePasswordVisibility} className="items-form">
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.passwordError && <p className="error-message">{errors.passwordError}</p>}
        </div>

        <div className="remember-forgot">
          <label>
            <Link to="/">Quên mật khẩu</Link>
          </label>
          <Link to="/">Đăng nhập với SMS</Link>
        </div>

        <Button htmlType="submit" type="primary">
          Đăng nhập
        </Button>

        <div className="register-link">
          <div>
            Bạn chưa có tài khoản?
            <Link to="/register" className="text-register"> Đăng kí </Link>
          </div>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
