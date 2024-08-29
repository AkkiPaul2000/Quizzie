// QuizContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from './constant';
import { useAuth } from './auth'; 

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const { user, logout, navigate} = useAuth(); // Get user and auth functions from useAuth

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (user) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/quiz/my-quizzes`, {
            headers: { Authorization: localStorage.getItem('token') },
          });
          setQuizzes(response.data);
        } catch (error) {
          if (error.response && error.response.status === 401) { 
            logout(); // logout if token is invalid
            navigate('/login');
            toast.error('Your session has expired. Please log in again.');
          } else {
            toast.error(error.response?.data?.error || 'Failed to fetch quizzes');
          }
        }
      } else {
        setQuizzes([]); 
      }
    };

    fetchQuizzes();
  }, [user]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizzes = () => {
  return useContext(QuizContext);
};