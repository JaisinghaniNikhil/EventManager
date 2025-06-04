import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssfiles/header.css';

function Header() {
  const [userName, setUserName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('name');
    setUserName(name);
  }, []);

  const handleLoginClick = () => {
    if (!userName) {
      navigate('/Login');
    } else {
      setDropdownVisible(!dropdownVisible);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserName('');
    setDropdownVisible(false);
    navigate('/Login');
  };

  return (
    <div className='index'>
      <div className='header'>
        <h1>Event Manager</h1>
        <div className='in-header'>
          <h3 onClick={()=>navigate('/')}>Home</h3>
          <div className='user-dropdown'>
            <h3 onClick={handleLoginClick} className='user-greeting'>
              {userName ? `Welcome, ${userName}` : 'Login'}
            </h3>
            {dropdownVisible && (
              <div className='dropdown-menu'>
                <button onClick={handleLogout} className='logout-button'>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
