import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constant';
import './CreateQuiz.css';
import plus from '../../assets/plus.svg'; 
import bin from '../../assets/bin.svg'; 
import cross from '../../assets/cross.svg';
import CopyLink from './CopyLink';
import { useAuth } from '../../utils/auth'; // Import useAuth
import { useQuizzes } from '../../utils/QuizContext'; // Import useQuizzes

const CreateQuiz = ({ onClose }) => {
  // ... (other state variables: quizType, quizIndex, optionType, completed, linkId)

  const { user } = useAuth(); // Get user from AuthContext
  const { quizzes, setQuizzes } = useQuizzes(); // Get quizzes and setQuizzes from QuizContext

  // ... (other functions: handleQuestionTextChange, handleCorrectAnswerChange, etc.)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quizData);

    // ... (Your existing validation logic)

    if (isValid) {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/quiz/create`, quizData, {
          headers: { Authorization: localStorage.getItem('token') },
        });

        console.log(quizData);
        toast.success('Quiz created successfully!');

        // Update the quiz list in the QuizContext
        setQuizzes([...quizzes, response.data]);

        const newQuizId = response.data._id; 
        setLinkId(newQuizId);
        setCompleted(!completed);
        toast.success('Quiz created successfully!');
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to create quiz');
      }
    }
  };

  // ... (rest of your component)
};