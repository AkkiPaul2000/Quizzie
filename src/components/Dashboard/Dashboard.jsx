import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constant";
import eye from "../../assets/eye.svg";
import "./Dashboard.css";
import { formatDate } from "../../utils/dateUtils";
import Loader from "../common/Loader";
import { useQuizzes } from "../../utils/quizContext";

const Dashboard = () => {
  const { user, logout, navigate } = useAuth();
  const { quizzes } = useQuizzes(); // Get quizzes from QuizContext
  const [statState, setStatState] = useState({
    quizCreated: 0,
    questionCreated: 0,
    impression: 0,
  });
  const [myTrendingQuizzes, setMyTrendingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // useEffect to fetch quizzes has been removed as it's handled by QuizProvider

  useEffect(() => {
    // Calculate statistics whenever quizzes change (from QuizContext)
    const newStats = {
      quizCreated: quizzes.length,
      questionCreated: quizzes.reduce((total, quiz) => total + quiz.questions.length, 0),
      impression: quizzes.reduce((total, quiz) => total + quiz.impressions, 0),
    };
    setStatState(newStats);
  }, [quizzes]); // Dependency on 'quizzes' from QuizContext

  useEffect(() => {
    setLoading(true)

    const fetchMyTrendingQuizzes = async () => {
      try {
        const userIdToFetch = user.userId; 

        const response = await axios.get(
          `${BACKEND_URL}/api/quiz/my-trending/${userIdToFetch}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setMyTrendingQuizzes(response.data);
      } catch (error) {
        console.log("server Crashed");
      }
    };

    if (user) { 
      fetchMyTrendingQuizzes();
      setLoading(false)
    }
  }, [user]);

  // ... (Add functions to handle quiz creation, sharing, etc. later)

  // Conditionally render loading indicator or content
  if (loading) {
    return <Loader/>;
  }
  return (
    <div className='dashboardPage'>
      <div className='statGrid'>
      <div className='stats'>
        
        <div className='data-container'> 
          <span className='data'>{statState.quizCreated}&nbsp;</span> 
          <span className='data-label'>Quizzes</span>
        </div>
        <div className='nLine'>Created </div>
      </div>
      <div className='stats'>
        <div className='data-container'> 
          <span className='data'>{statState.questionCreated}&nbsp;</span> 
          <span className='data-label'>Questions</span>
        </div>
        <div className='nLine'>Created </div>
      </div>
        <div className='stats'>
          <div className='data-container'> 
            <span className='data'>{statState.impression > 1000 
    ? `${(statState.impression / 1000).toFixed(1)}K` 
    : statState.impression
  }&nbsp;</span> 
            <span className='data-label'>Total</span>
          </div>
          <div className='nLine'>Impressions </div>
        </div>
      </div>  

      <div className='TrendingQuiz'>
        <div><h1>Trending Quizs</h1></div>
      <div className='trendQuizGrp'>
      {myTrendingQuizzes.map(quiz =>
      <div className="trendContainer">
            <div className='trendQuiz' key={quiz._id}>
              <div className='trendHead'>
                <div>{quiz.title}</div>
                <div className='views'>{quiz.impressions}<img src={eye} alt="views" /></div>
              </div>
              <div className='createdOn'>Created on : {formatDate(quiz.createdAt)}</div> {/* Display formatted date */}
            </div>
            </div>
       )}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;