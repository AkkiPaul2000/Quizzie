// src/components/common/CreateQuizModal.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constant';
import './Dashboard.css'
import plus from '../../assets/Vector.svg'; // Assuming your SVG is in the 'assets' folder

const CreateQuizModal = ({ onClose }) => {
//TODO fix this outside click to close the modal
  // const modalRef = useRef(null); // Create a ref to the modal container

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       onClose(); // Close the modal if clicked outside
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);   

  //   };
  // }, [onClose]);
  const [quizType,setQuizType]=useState(false)
  const [quizIndex,setQuizIndex]=useState(0)
  const [optionType,setOptionType]=useState("Text")


  const [quizData, setQuizData] = useState({
    title: '',
    type: 'qna', 
    questions: [
      { questionText: '', options: ['option1', 'option2'], correctAnswer: 0, timer: 0 },
    ],
  });
  const handleCorrectAnswerChange = (questionIndex, newCorrectAnswer) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = [...prevQuizData.questions];
      updatedQuestions[questionIndex].correctAnswer = newCorrectAnswer;
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };

  const handleClose=()=>{
    setQuizType(false)
    setQuizData({
      title: '',
      type: 'qna', 
      questions: [
        { questionText: '', options: ['option1', 'option2'], correctAnswer: 0, timer: 0 },
      ],
    })
    onClose();


  }
  const handleOptionType=(e)=>{
    setOptionType(e.target.value)
  }
  
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
          { questionText: '', options: ['option1', 'option2'], correctAnswer: 0, timer: 0 },
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
      await axios.post(`${BACKEND_URL}/api/quiz/create`, quizData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      toast.success('Quiz created successfully!');
      onClose(); // Close the modal after successful creation
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create quiz');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {/* <h2>Create New Quiz</h2> */}
        <form onSubmit={handleSubmit}>
        {!quizType && (
        <div >
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <input
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleInputChange}
              placeholder='Quiz name'
              required
              className='quizName'
            />
          </div>
          <div>
          <div className='typeButton' >
                <label htmlFor="type" >Type:</label>
                <button
                  type="button" 
                  name="type" 
                  className={`type-button ${quizData.type === 'qna' ? 'active' : ''}`} 
                  onClick={() => setQuizData({ ...quizData, type: 'qna' })}
                >
                  Q&A
                </button>
                <button 
                  type="button" 
                  name="type" 
                  className={`type-button ${quizData.type === 'poll' ? 'active' : ''}`} 
                  onClick={() => setQuizData({ ...quizData, type: 'poll' })}
                >
                  Poll Type
                </button>
           
            </div>
          </div>
          <div className='buttons'>
            <button onClick={handleClose} className='cancel'>Cancel</button>
          <button
          // className={(!quizData.title || !quizData.type)?'disabled':'createQuiz'}
          className='createQuiz'          
          onClick={()=>{
            setQuizType(!quizType)
            }} disabled={!quizData.title || !quizData.type}>Continue</button></div>
          </div>
          )}
          {!!quizType && (

            

          <div className='quizList'> 

            { /*  number section */}
            <div className='indexGrp' style={{display:'flex',justifyContent:'flex-start',alignItems:'center',margin:'10px 30px',padding:'0px 10px'}}>
             {quizData.questions.map((question, index) =><div className='quizIndex' style={{cursor:'pointer'}} key={index}>
              {index+1}
             <span className="close" onClick={handleClose}>&times;</span>
             </div> )}
             <div style={{cursor:'pointer'}}><img src={plus} alt="Add" /></div>
             </div >
              {/* QNA/Poll Question */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <input
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleInputChange}
              placeholder='Quiz name'
              required
              className='quizName'
              style={{height:'2.5rem'}}
            />
            </div>

              {/* detail section */}
             <div className='quizDetails'>
              
              {/* Option Type */}
              <div className='typeButton1' style={{margin:'10px 50px'}} >
              <label htmlFor="type" >Option Type</label>
              <label>
              <label>
                <input 
                  type="radio" 
                  name="type" 
                  value="Text" 
                  checked={optionType === 'Text'}
                  onChange={handleOptionType} 
                />
                <span className="radio-button">Text</span>
              </label>
              <label>
                <input 
                  type="radio" 
                  name="type" 
                  value="Image URL" 
                  checked={optionType === 'Image URL'}
                  onChange={handleOptionType} 
                />
                <span className="radio-button" style={{whiteSpace:'nowrap'}}>Image URL</span> 
              </label>
              <label>
                <input 
                  type="radio" 
                  name="type" 
                  value="Text & Image URL" 
                  checked={optionType === 'Text & Image URL'}
                  onChange={handleOptionType} 
                />
                <span className="radio-button" style={{whiteSpace:'nowrap'}}>Text & Image URL</span> 
              </label>
              </label>
            </div>
             </div>
            {/* Conditional input rendering */}
            {/* Text */}
            {optionType=="Text"  &&
            <div className='typeFields'  >
                <div className='optionGroup'>
                <div className='options'>
                  {quizData.questions[quizIndex].options.map((opt, optionIndex) => (
                    <div className='option' key={optionIndex}> 
                      <label key={optionIndex}> {/* Add key prop to label */}
                        <input 
                          type="radio" 
                          name={`question-${quizIndex}-options`} 
                          value={optionIndex}
                          checked={quizData.questions[quizIndex].correctAnswer === optionIndex} 
                          onChange={() => handleCorrectAnswerChange(quizIndex, optionIndex)} 
                        />
                        <span className="radio-button">{opt}</span> 
                      </label>
                    </div>
                  ))}
                </div>
                  <div className='timers'>Timer</div>
                </div>
              </div>}

            {/* Image */}
            {optionType=="Image URL"  &&<div className='typeFields' >Image URL</div>}

            {/* Text+URL */}
            {optionType=="Text & Image URL"  &&<div className='typeFields' >Text & Image URL</div>}

             <div className='buttons'><button onClick={handleClose} className='cancel'>Cancel</button>
          <button className='createQuiz' type="submit">Create Quiz</button></div>
          </div>)}
        </form>
      </div>
    </div>
  );
};

export default CreateQuizModal;