import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quiz/my-quizzes', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setQuizzes(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to fetch quizzes');
      }
    };

    if (user) {
      fetchQuizzes();
    }
  }, [user]);

  // ... (Add functions to handle quiz creation, sharing, etc. later)

  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <h3>Your Quizzes</h3>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link> 
            {/* Add share button and other actions here */}
          </li>
        ))}
      </ul>
      {/* Add button or form to create a new quiz */}
    </div>
  );
};

export default Dashboard;