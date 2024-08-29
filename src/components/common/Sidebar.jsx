// src/components/common/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Common.css'
import { useAuth } from '../../utils/auth';
import { toast } from 'react-toastify';
import CreateQuiz from '../Dashboard/CreateQuiz';
import { useQuizzes } from '../../utils/quizContext';
const Sidebar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const { activeSidebarItem, setActiveSidebarItem } = useQuizzes(); // Access from QuizContext

  const [selIndex,setSelIndex]=useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate=useNavigate();
  
  const handleCreateQuizClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = async (e) => {
    logout()
    toast.dark('Logout successful!');
    Navigate('/login')
  }
  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('dashboard')) {
      setActiveSidebarItem('Dashboard'); 
    } else if (currentUrl.includes('analytics')) { 
      setActiveSidebarItem('Analytics');
    } 
    else if (currentUrl.includes('analysis')) { 
      setActiveSidebarItem('Analytics');
    } 
  }, []); 
  return (
    <>
    {isLoggedIn && (
      <aside style={{ width: '200px', backgroundColor: '#FFFFFF', color: '#474444', padding: '0px 20px' }}>
        {/* ... */}
        <div className='navButtons'>
          <div
            className={`navButton ${activeSidebarItem === 'Dashboard' ? 'activeLink' : ''}`}
            onClick={() => {
              setActiveSidebarItem('Dashboard');
              navigate('/dashboard');
            }}
          >
            Dashboard
          </div>
          <div
            className={`navButton ${activeSidebarItem === 'Analytics' ? 'activeLink' : ''}`}
            onClick={() => {
              setActiveSidebarItem('Analytics');
              navigate('/analytics');
            }}
          >
            Analytics
          </div>
          <div
            className={`navButton ${activeSidebarItem === 'Create Quiz' ? 'activeLink' : ''}`}
            onClick={() => {
              handleCreateQuizClick();
            }}
          >
            Create Quiz
          </div>
        </div>
        {/* ... */}
      </aside>
    )}

    {isModalOpen && <CreateQuiz onClose={handleCloseModal} />}
  </>
  );
};

export default Sidebar;
