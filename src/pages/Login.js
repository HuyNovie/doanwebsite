import React, { useState } from "react";
import "./Login.css"
import {Button,Input} from 'antd';
import { Link } from "react-router-dom";
import { FaUser, FaEyeSlash, FaEye  } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dayOfBirth, setDayOfBirth] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

  const [user,setUser] = useState({
    email: "",
    password: "",
});

  // kiem tra value co hay khong
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateData = (name, value) => {
    let isValid = true;
    switch(name) {
      case 'email':
        if (!value) {
          setEmailError("Vui lòng điền vào mục này.");
          isValid = false;
        } else {
                setEmailError("")  
            }
        
        break;
      case 'password':
        if (!value) {
          setPasswordError("Vui lòng điền vào mục này.");
          isValid = false;
          }else {
          setPasswordError("");
            }
        break;
      default:
        break;
    }
    return isValid;
  };

  // lay gia tri tu input
  const handeChange = (e) => {
      const {value, name} = e.target;

      setUser({
          ...user,
          [name]:value,
      });
      validateData(name, value);
  };


  const handleSubmit = (e) => {
      e.preventDefault();

      const emailValid = validateData("email", user.email);
      const passwordValid= validateData("password", user.password);

  }
  //   // handle cho form login
//   const handleSubmitLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:8080/identity/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         }
//       );

//       const data = await response.json();
//       if (data.result.authenticated) {
//         console.log("Login successful:", data.result);

//         localStorage.setItem("token", data.result.token);
//         window.location.href = "/";
//       } else {
//         setErrorMessage = data.message;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Please try again.");
//     }
//   };


  //show password
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
  <div className='wrapper'>
      <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='form-group'>
              <Input type='email' onChange={handeChange} name='email' status = {emailError? 'error' : ''} placeholder='Email' />
              <span className='items-form'><FaUser /></span>
              {emailError &&(
              <p className='error-message'>{emailError}</p>
          )}
          
          </div>

          <div className='form-group'>
              <Input type={passwordShown ? "text" : "password"} onChange={handeChange} status = {passwordError ? 'error' : ''} name='password' placeholder='Mật khuẩu' />
              <span onClick={togglePasswordVisibility} className='items-form'>
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
              {passwordError &&(
              <p className='error-message'>{passwordError}</p>
          )}
          </div>

          <div className='remember-forgot'>
              <label><input className='checkbox' type='checkbox'/>Ghi nhớ</label>
              <Link to = '/'>Quên mật khẩu?</Link>      
          </div>
          <div >
              <Button htmlType='submit' type='primary'>
                  Đăng nhập
              </Button>
          </div> 
          
          <div className='register-link'>
              <p>Bạn chưa có tài khoản ?
              <Link to= "/register" className='text-register'>Đăng kí</Link> 
              </p>
          </div>
      </form>
  </div>
    );
  }






export default Login;
