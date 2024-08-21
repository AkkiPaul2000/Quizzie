import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Quiz.css'
import { BACKEND_URL } from '../../utils/constant';

function TakeQuiz() { 
  const { id } = useParams();
  const quizId=id
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    // Fetch quiz data using axios or fetch API
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/quiz/${quizId}`);
        setQuizData(response.data)
        setTimeRemaining(response.data.questions[0].timer); // Set timer for the first question
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchQuizData();
  }, [quizId]); // Run this effect whenever quizId changes

  useEffect(() => {
    let timerId;

    if (timeRemaining > 0 && !isQuizFinished) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !isQuizFinished) {
      handleNextQuestion(); // Move to the next question when timer runs out
    }

    return () => clearInterval(timerId); // Cleanup the timer on unmount or when quiz is finished
  }, [timeRemaining, isQuizFinished]);

  const handleAnswerSelect = (selectedOption) => {
    setUserAnswers([...userAnswers, selectedOption]);

    if (quizData.type === 'qna') {
      // Check if the answer is correct and update the score (you'll need to implement this logic)
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (!quizData) return; // Do nothing if quizData is not yet loaded
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeRemaining(quizData.questions[nextQuestionIndex].timer);
    } else {
      setIsQuizFinished(true);
    }
  };
  return (
    <div className="testModal"> 
    {console.log("this is data", isQuizFinished,quizData)}
      {!isQuizFinished && quizData && (
        
        <div>
          <h3>{quizData.questions[currentQuestionIndex].questionText}</h3>

          {/* Render options based on optionType */}
          
          {quizData.questions[currentQuestionIndex].type=="both" && quizData.questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleAnswerSelect(option)}>
              
              {option.text && <span>{option.text}</span>}
              {option.imageUrl && <img src={option.imageUrl} alt={`Option ${optionIndex + 1}`} />}
            </div>
          ))}
          {quizData.questions[currentQuestionIndex].type=="imageUrl" && quizData.questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleAnswerSelect(option)}>
                            {option.imageUrl && <img src={option.imageUrl} alt={`Option ${optionIndex + 1}`} />}
            </div>
          ))}
          {quizData.questions[currentQuestionIndex].type=="text" && quizData.questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleAnswerSelect(option)}>
              {option.text && <span>{option.text}</span>}
            </div>
          ))}

          <p>Time remaining: {timeRemaining} seconds</p>
        </div>
        
      )}

      {isQuizFinished && quizData.type === 'qna' && (
        <div>
          {/* Display quiz results (score, etc.) */}
        </div>
      )}
    </div>
  );
}

export default TakeQuiz














////////////////////
// import React from 'react'
// import { useParams } from 'react-router-dom';

// function TakeQuiz() {
//     const {id} = useParams();
//   console.log(id)
//   return (
//     <div>TakeQuiz</div>
//   )
// }

// export default TakeQuiz