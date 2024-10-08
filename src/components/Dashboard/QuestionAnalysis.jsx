import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './QuestionAnalysis.css'
import { useAuth } from '../../utils/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils/constant';
import { formatDate } from '../../utils/dateUtils';
import Loader from '../common/Loader';

const QuestionAnalysis = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [quiz, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true)
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/quiz/analytics/${id}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setQuizzes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        
        // Handle 401 Unauthorized (invalid token) specifically
        if (error.response && error.response.status === 401) {
          toast.error('You need to be logged in to view quiz analytics.');
        } else {
          toast.error(error.response?.data?.error || 'Failed to fetch quizzes');
        }
      }
    };

    if (user) {
      fetchQuizzes();
      setLoading(false)
    }
  }, [user, id]); // Include 'id' in the dependency array


  if(loading){
    return <Loader/>
  }

  if (!quiz) {
    return <div>No quiz data available</div>;
  }
 
        
  return (
    <div className="question-analysis">
      {console.log(loading)}
      <div className="headerDiv">
        <h1>{quiz.title}- Question Analysis</h1>
        <div className='QuickData'><span>Created on: {formatDate(quiz.createdAt)}</span><span>Impressions: {quiz.impressions}</span></div>
      </div>
      {quiz.type=="qna" && <div className="questions">
        {quiz.questions.map(question=>
        <div className="question-card" key={question._id}>
        <h2>{question.questionText}</h2>
        <div className='datas'>
        <div className='data'>
                <p className='impData'>{question.impressions}</p>
                <p>people Attempted the question</p>
        </div>
        <div className='data'>
                <p className='impData'>{question.correctAttempts}</p>
                <p>people Answered Correctly</p>
        </div>
        <div className='data'>
                <p className='impData'>{question.wrongAttempts}</p>
                <p>people Answered Incorrectly</p>
        </div>
        </div>
        </div>)}
        </div>}
        {quiz.type=="poll" && <div className="questions">
        {quiz.questions.map(question=>
        <div className="question-card" key={question._id}>
        <h2>{question.questionText}</h2>
        <div className='datas'>
          {question.options.map((option,index)=>
        <div className='data' key={index} >
                <p className='impData'>{option.clicked}</p>
                <p>{option.text}</p>
        </div>)}
        </div>
        </div>)}
        </div>}
    </div>
  );
};

export default QuestionAnalysis;
