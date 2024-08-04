import React, { useState } from "react";
import "./Login.css";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    let isValid = true;
    switch (name) {
      case "username":
        if (!value) {
          setUsernameError("Vui lòng điền vào mục này.");
          isValid = false;
        } else if (value.length < 8) {
          setUsernameError("Tên tài khoản phải dài hơn 8 kí tự");
          isValid = false;
        } else {
          setUsernameError("");
        }
        break;
      case "password":
        if (!value) {
          setPasswordError("Vui lòng điền vào mục này.");
          isValid = false;
        } else if (value.length < 8) {
          setPasswordError("Mật khẩu phải dài hơn 8 kí tự");
          isValid = false;
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);

    if (usernameValid && passwordValid) {
      try {
        const response = await fetch(
          "http://localhost:8080/identity/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
            }),
          }
        );

        const data = await response.json();
        if (data.result && data.result.authenticated) {
          console.log("Login successful:", data.result);

          localStorage.setItem("token", data.result.token);
          window.location.href = "/";
        }
        if (data.code === 1005) {
          setErrorMessage("Tài khoản không tồn tại");
        }
        if (data.code === 1006) {
          setErrorMessage("Mật khẩu không chính xác!");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Vui lòng thử lại sau");
      }
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <Input
            type="text"
            onChange={handleChange}
            name="username"
            status={usernameError ? "error" : ""}
            placeholder="Tên tài khoản"
          />
          <span className="items-form">
            <FaUser />
          </span>
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>

        <div className="form-group">
          <Input
            type={passwordShown ? "text" : "password"}
            onChange={handleChange}
            status={passwordError ? "error" : ""}
            name="password"
            placeholder="Mật khẩu"
          />
          <span onClick={togglePasswordVisibility} className="items-form">
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </span>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="remember-forgot">
          <label>
            <input className="checkbox" type="checkbox" />
            Ghi nhớ
          </label>
          <Link to="/">Quên mật khẩu?</Link>
        </div>
        <div>
          <Button htmlType="submit" type="primary">
            Đăng nhập
          </Button>
        </div>

        <div className="register-link">
          <p>
            Bạn chưa có tài khoản ?
            <Link to="/register" className="text-register">
              Đăng kí
            </Link>
          </p>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
