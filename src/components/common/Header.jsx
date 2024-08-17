// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth'; // Assuming you have an auth context

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;