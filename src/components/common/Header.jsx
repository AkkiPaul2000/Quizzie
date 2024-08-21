// Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth'; // Assuming you have an auth context
import CreateQuizModal from '../Dashboard/CreateQuizModal';

const Header = () => {
  const { isLoggedIn, logout,user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation(); // Get the current location
  console.log(location)
  // console.log("User",user)
  const handleCreateQuizClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const showHeader = location.pathname === '/dashboard' || location.pathname === '/analytics';

  return (
    (showHeader && isLoggedIn) && (
      <header style={{ backgroundColor: '#FFFFFF', flex: isLoggedIn ? 0.5 : 0 }}>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="#" onClick={handleCreateQuizClick}>Create Quiz</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
          {isModalOpen && <CreateQuizModal onClose={handleCloseModal} />}
        </nav>
      </header>)
  );
};

export default Header;