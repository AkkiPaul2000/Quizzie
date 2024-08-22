import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constant';

function QuizAnalytics() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/quiz/my-quizzes`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setQuizzes(response.data);
        console.log(response.data)

      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.error || 'Failed to fetch quizzes');
      }
    };

    if (user) {
      fetchQuizzes();
    }
  }, [user]);
  return (
    <div className='quizAnalytics'>
      <h1>Quiz Analytics</h1>
      <table>
    <thead>
      <tr>
        <th>S.No</th>
        <th>Quiz Name</th>
        <th>Created on</th>
        <th>Impression</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {quizzes && quizzes.map((ques,index)=><tr>
        <td>{index}</td>
        <td>{ques.title}</td>
        <td>01 Sep, 2023</td>
        <td>{ques.impressions}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="share-btn">Share</button>
          <a href="#" class="analysis-link">Question Wise Analysis</a>
        </td>
      </tr>)}
      
      
      </tbody>
  </table>
    </div>
  )
}

export default QuizAnalytics