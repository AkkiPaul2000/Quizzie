// src/components/common/CreateQuizModal.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateQuizModal = ({ onClose }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    type: 'qna', 
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: '', timer: 0 },
    ],
  });

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    if (quizData.questions.length < 5) { 
      setQuizData({
        ...quizData,
        questions: [
          ...quizData.questions,
          { questionText: '', options: ['', '', '', ''], correctAnswer: '', timer: 0 },
        ],
      });
    } else {
      toast.warning('You can only have a maximum of 5 questions.');
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(index, 1);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (you can add more as needed)
    if (!quizData.title || quizData.questions.some(q => !q.questionText)) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('/api/quiz/create', quizData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      toast.success('Quiz created successfully!');
      onClose(); // Close the modal after successful creation
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create quiz');
    }
  };

  return (
    <div className="modal"> {/* Add appropriate CSS classes for styling */}
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={quizData.type}
              onChange={handleInputChange}
            >
              <option value="qna">Q&A</option>
              <option value="poll">Poll</option>
            </select>
          </div>

          {/* Questions section */}
          {quizData.questions.map((question, index) => (
            <div key={index}>
              <h3>Question {index + 1}</h3>
              <div>
                <label htmlFor={`questionText-${index}`}>Question:</label>
                <input
                  type="text"
                  id={`questionText-${index}`}
                  name="questionText"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                  required
                />
              </div>
              {/* ... options, correctAnswer (if Q&A), timer input fields */}
              <button type="button" onClick={() => handleRemoveQuestion(index)}>
                Remove Question
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizModal;