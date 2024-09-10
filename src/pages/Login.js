import React, { useState } from "react";
import "./Login_Register.css";
import { login } from "../services/authService";
import { Button, Input } from "antd";
import { Link} from "react-router-dom";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
        } else {
          setUsernameError("");
        }
        break;
      case "password":
        if (!value) {
          setPasswordError("Vui lòng điền vào mục này.");
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
    setUser({ ...user, [name]: value });
    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);

    if (usernameValid && passwordValid) {
      try {
        const response = await login(user.username, user.password);

        if (
          response &&
          response.data.result &&
          response.data.result.authenticated
        ) {
          console.log("Login successful:", response.data.result);
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

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="wrapper" style={{marginTop: "150px"}}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">Đăng nhập</h1>
        <div className="form-group">
          <Input
            type="text"
            onChange={handleChange}
            name="username"
            status={usernameError ? "error" : ""}
            placeholder="Email/Tên tài khoản/Số điện thoại"
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
            <Link to="/">Quên mật khẩu</Link>
          </label>
          <Link to="/">Đăng nhập với sms</Link>
        </div>
        <div>
          <Button htmlType="submit" type="primary">
            Đăng nhập
          </Button>
        </div>

        <div className="register-link">
          <p>
            Bạn chưa có tài khoản?
            <Link to="/register" className="text-register">
              {" "}
              Đăng kí{" "}
            </Link>
          </p>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
