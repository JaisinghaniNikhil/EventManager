import React, { useState } from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../cssfiles/login.css';

function Signup() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [pass, setpass] = useState('');
  const [passError, setPassError] = useState('');

  const navigate = useNavigate();

  const validateSignup = async () => {
    setNameError('');
    setUsernameError('');
    setPassError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name === '' || username === '' || pass === '') {
      alert('Please fill all the fields');
      return;
    } else if (name.length < 5) {
      setNameError('Name Length Should be Greater than 5');
      return;
    } else if (!emailRegex.test(username)) {
      setUsernameError('Invalid Username Format');
      return;
    } else if (pass.length < 6) {
      setPassError('Password length should be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5070/signup', {
        name:name,
        email: username,
        password: pass
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      alert("Signup successful!");
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      alert(msg);
    }
  };

  return (
    <div className='container'>
      <Header />
      <div className='mycont'>
        <div className='innercont'>
          <h2>Signup</h2>
          <div className='form'>
            <input
              type='text'
              placeholder='Enter FullName'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className='error'>{nameError}</span>
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
            <button onClick={validateSignup}>Signup</button>
            <label>
              Already a User?
              <span
                style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                onClick={() => navigate('/Login')}
              >
                Login
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
