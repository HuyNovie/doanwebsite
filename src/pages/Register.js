import React from "react";
import "./Login_Register.css";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import validateEmail from "../utils/validateData";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    fullName: "",
    mail: "",
    password: "",
    status: 1,
  });

  const [fullNameError, setFullNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    let isValid = true;
    switch (name) {
      case "fullName":
        if (!value) {
          setFullNameError("Vui lòng điền vào mục này.");
          isValid = false;
        } else {
          setFullNameError("");
        }
        break;
      case "mail":
        if (!value) {
          setMailError("Vui lòng điền vào mục này.");
          isValid = false;
        } else {
          if (!validateEmail(value)) {
            setMailError("Email không được định dạng đúng!");
            isValid = false;
          } else {
            setMailError("");
          }
        }
        break;
      case "password":
        if (!value) {
          setPasswordError("Vui lòng điền vào mục này.");
          isValid = false;
        } else {
          const errors = [];
          if (value.length < 8) errors.push("Mật khẩu phải ít nhất 8 ký tự");
          if (errors.length > 0) {
            setPasswordError(`Cần ${errors.join(", ")}`);
            isValid = false;
          } else {
            setPasswordError("");
          }
        }
        break;
      default:
        break;
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    validateData(name, value);
  };

  const unorm = require("unorm");

  function generateUsername(fullName) {
    const removeAccents = (str) => {
      return unorm.nfd(str).replace(/[\u0300-\u036f]/g, "");
    };

    const cleanedName = removeAccents(fullName)
      .replace(/\s+/g, "")
      .toLowerCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${cleanedName}${randomDigits}`;
  }

  function generateFirstName(fullName) {
    const nameParts = fullName.split(" ");
    return nameParts.slice(-1).join(" ");
  }

  function generateLastName(fullName) {
    const nameParts = fullName.split(" ");
    return nameParts.slice(0, -1).join(" ");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullNameValid = validateData("fullName", user.fullName);
    const mailValid = validateData("mail", user.mail);
    const passwordValid = validateData("password", user.password);

    if (fullNameValid && mailValid && passwordValid) {
      const username = generateUsername(user.fullName);
      const firstName = generateFirstName(user.fullName);
      const lastName = generateLastName(user.fullName);
      const dayOfBirth = "2000-01-01";
      const phone = "";

      try {
        const response = await fetch(
          "http://localhost:8080/identity/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password: user.password,
              mail: user.mail,
              phone,
              firstName,
              lastName,
              dayOfBirth,
            }),
          }
        );

        const data = await response.json();
        if (data.code === 1000) {
          console.log("Register successful:", data.result);
          window.location.href = "/";
        }
        if (data.code === 1002) {
          console.log("Register fail:", data.message);
          setErrorMessage("Tài khoản đã tồn tại");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Vui lòng thử lại sau.");
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
        <h1>Đăng kí</h1>
        <div className="form-group">
          <Input
            type="text"
            name="fullName"
            onChange={handleChange}
            status={fullNameError ? "error" : ""}
            placeholder="Họ và Tên"
          />
          {fullNameError && <p className="error-message">{fullNameError}</p>}
        </div>
        <div className="form-group">
          <Input
            type="email"
            name="mail"
            onChange={handleChange}
            status={mailError ? "error" : ""}
            placeholder="Email"
          />
          {mailError && <p className="error-message">{mailError}</p>}
        </div>
        <div className="form-group">
          <Input
            type={passwordShown ? "text" : "password"}
            name="password"
            onChange={handleChange}
            status={passwordError ? "error" : ""}
            placeholder="Mật khẩu"
          />
          <span onClick={togglePasswordVisibility} className="items-form">
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </span>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div>
          <Button htmlType="submit" type="primary">
            Đăng kí
          </Button>
        </div>
        <div className="login-link">
          <div>
            Bạn đã có tài khoản chưa?
            <Link to="/login" className="text-login">
              Đăng nhập
            </Link>
          </div>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
