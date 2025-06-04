import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../cssfiles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [pass, setpass] = useState('');
  const [passError, setPassError] = useState('');

  const navigate = useNavigate();

  const validateLogin = async () => {
    setUsernameError('');
    setPassError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username === '' || pass === '') {
      alert('Please fill all the fields');
      return;
    } else if (!emailRegex.test(username)) {
      setUsernameError('Invalid Username Format');
      return;
    } else if (pass.length < 6) {
      setPassError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('https://eventmanager-1-suhl.onrender.com/login', {
        email: username,
        password: pass
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name',response.data.name)
      alert("Login successful!");
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <div className='container'>
      <Header />
      <div className='mycont'>
        <div className='innercont'>
          <h2>Login</h2>
          <div className='form'>
            <input
              type='text'
              placeholder='Enter Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className='error'>{usernameError}</span>
            <input
              type='password'
              placeholder='Enter Password'
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              required
            />
            <span className='error'>{passError}</span>
            <button onClick={validateLogin}>Login</button>
            <label>
              Don't Have an Account?
              <span
                style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                onClick={() => navigate('/Signup')}
              >
                Signup
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
