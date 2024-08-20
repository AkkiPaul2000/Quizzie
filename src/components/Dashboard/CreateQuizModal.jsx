// src/components/common/CreateQuizModal.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constant';
import './Dashboard.css'
import plus from '../../assets/plus.svg'; // Assuming your SVG is in the 'assets' folder
import bin from '../../assets/bin.svg'; 

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

  const handleQuestionTextChange = (questionIndex, newQuestionText) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = [...prevQuizData.questions];
      updatedQuestions[questionIndex].questionText = newQuestionText;
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };

  const [quizData, setQuizData] = useState({
    title: '',
    type: 'qna', 
    questions: [
      { questionText: '', options: ['', ''], correctAnswer: 0, timer: 0,type:'Text' },
    ],
  });
  const currentOptionsLength = quizData.questions[quizIndex].options.length;


  const handleCorrectAnswerChange = (questionIndex, newCorrectAnswer) => {
    // console.log(questionIndex,newCorrectAnswer)
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
        { questionText: '', options: ['', ''], correctAnswer: 0, timer: 0,type:"text" },
      ],
    })
    onClose();


  }
  const handleOptionType=(e)=>{
    setOptionType(e.target.value)
  }

  const handleTimerChange = (e,questionIndex, newTimerValue) => {
    e.preventDefault();

    setQuizData(prevQuizData => {
      const updatedQuestions = [...prevQuizData.questions];
      updatedQuestions[questionIndex].timer = newTimerValue;
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };
  
  
  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };
  const handleOptionTextChange = (questionIndex, optionIndex, newOptionText) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = [...prevQuizData.questions];
      updatedQuestions[questionIndex].options[optionIndex] = newOptionText;
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };  
  const handleAddOption = () => {
    console.log("Yo");
  
    if (quizData.questions[quizIndex].options.length < 4) { 
      setQuizData(prevQuizData => ({
        ...prevQuizData,
        questions: prevQuizData.questions.map((question, index) => 
          index === quizIndex 
            ? { ...question, options: [...question.options, ''] } 
            : question
        )
      }));
    } else {
      toast.warning('You can only have a maximum of 4 options per question.');
    }
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

  const handleRemoveOption = (questionIndex, optionIndex) => {
    setQuizData(prevQuizData => {
      const updatedQuestions = prevQuizData.questions.map((question, index) => {
        if (index === questionIndex) {
          const updatedOptions = [...question.options];
          updatedOptions.splice(optionIndex, 1); // Remove the option at the specified index
          return {
            ...question,
            options: updatedOptions 
          };
        }
        return question;
      });
      return { ...prevQuizData, questions: updatedQuestions };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation (you can add more as needed)
    console.log(quizData)
    if (!quizData.title || quizData.questions.some(q => !q.questionText)) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const hasEmptyOptions = quizData.questions.some(question => 
      question.options.some(option => option.trim() === '')
    );
  
    if (hasEmptyOptions) {
      toast.error('Please fill in all option fields.');
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
             {quizData.questions.map((question, index) =><div className='quizIndex' style={{cursor:'pointer'}} key={index} onClick={()=>setQuizIndex(index)}>
              {index+1}
             {index>0 && <span className="close" onClick={()=>handleRemoveQuestion(index)}>&times;</span>}
             </div> )}
             <div style={{cursor:'pointer'}} onClick={handleAddQuestion}><img src={plus} alt="Add" /></div>
             </div >
              {/* QNA/Poll Question */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <input
              type="text"
              id="title"
              name="title"
              value={quizData.questions[quizIndex].questionText}
              onChange={(e) => handleQuestionTextChange(quizIndex, e.target.value)}
              placeholder={`${quizData.type} Question`  }
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
            
            <div className='typeFields'  >
                <div className='optionGroup'>
                {optionType=="Text"  &&(<div className='options'>
                  {quizData.questions[quizIndex].options.map((opt, optionIndex) => (
                    <div className='option' key={optionIndex}> 
                      <label key={optionIndex}>
                      <input 
                        type="radio" 
                        name={`question-${quizIndex}-options`} 
                        value={optionIndex}
                        checked={quizData.questions[quizIndex].correctAnswer === optionIndex} 
                        onChange={() => handleCorrectAnswerChange(quizIndex, optionIndex)} 
                      />
                      <span className="radio-button">
                        <input // Add an input field for editing
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionTextChange(quizIndex, optionIndex, e.target.value)}
                        />
                      </span> 
                      {optionIndex>1 && <img style={{marginLeft:10,cursor:'pointer'}}src={bin} alt="delete" onClick={() => handleRemoveOption(quizIndex, optionIndex)} />}
                    </label>
                    </div>
                  ))}
                  {currentOptionsLength < 4 && ( // Use currentOptionsLength in the condition
                      <button onClick={handleAddOption} >
                        Add Option
                      </button>
                    )}
                </div>)}
                {optionType === "Image URL" && (
                    <div className='options'>
                      {quizData.questions[quizIndex].options.map((opt, optionIndex) => (
                        <div className='option' key={optionIndex}>
                          <label key={optionIndex}>
                            <input
                              type="radio"
                              name={`question-${quizIndex}-options`}
                              value={optionIndex}
                              checked={quizData.questions[quizIndex].correctAnswer === optionIndex}
                              onChange={() => handleCorrectAnswerChange(quizIndex, optionIndex)}
                            />
                            <span className="radio-button">
                              <input // Input field for image URLs
                                type="url" // Change to 'url' for URL validation
                                value={opt}
                                onChange={(e) => handleOptionTextChange(quizIndex, optionIndex, e.target.value)}
                                placeholder="Enter image URL"
                              />
                            </span>
                            {optionIndex > 1 && (
                              <img
                                style={{ marginLeft: 10, cursor: 'pointer' }}
                                src={bin}
                                alt="delete"
                                onClick={() => handleRemoveOption(quizIndex, optionIndex)}
                              />
                            )}
                          </label>
                        </div>
                      ))}
                      {currentOptionsLength < 4 && (
                        <button onClick={handleAddOption}>
                          Add Option
                        </button>
                      )}
                    </div>
                  )}
                  <div className='timers'>
                    <span>Timer</span>
                    <button style={{height:5}} className={quizData.questions[quizIndex].timer==0?'timer-active':''}
                    onClick={(e) => handleTimerChange(e,quizIndex, 0)}
                    >OFF</button>
                    <button className={quizData.questions[quizIndex].timer==5?'timer-active':''}
                    onClick={(e) => handleTimerChange(e,quizIndex, 5)}
                    >5sec</button>
                    <button className={quizData.questions[quizIndex].timer==10?'timer-active':''}
                    onClick={(e) => handleTimerChange(e,quizIndex, 10)}
                    >10sec</button>
                  </div>
                </div>
              </div>
           

            {/* Image */}


            {/* {optionType=="Image URL"  &&
            <div className='typeFields' >Image URL</div>} */}






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