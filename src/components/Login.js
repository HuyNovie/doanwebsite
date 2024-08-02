import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [errorMessage, setErrorMessage] = useState('');


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try{
        const response = await fetch('http://localhost:8080/identity/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
          if (data.result.authenticated) {
              console.log('Login successful:', data.result);
      
            localStorage.setItem('token', data.result.token);
            window.location.href='/';
          } else {
              setErrorMessage = data.message;
          }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Please try again.');
    }
  };

  return (
    <div>
        {/* login */}
        <form onSubmit={handleSubmitLogin}>
            <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


        {/* register */}
        {/* <form onSubmit={handleSubmitRegister}>
            <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form> */}
  </div>
  );
};

export default Login;
