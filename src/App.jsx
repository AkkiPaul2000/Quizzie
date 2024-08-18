import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/common/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// import Dashboard from './components/Dashboard/Dashboard'; // We'll create this later
// import TakeQuiz from './components/Quiz/TakeQuiz';
// import QuizResult from './components/Quiz/QuizResult';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import { AuthProvider } from './utils/auth';

function App() {
  return (
      <AuthProvider >
    <Router>
      {/* <Header /> */}
      <ToastContainer /> 
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Navigate to="/register" replace />} /> {/* Redirect to /home */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/quiz/result/:id" element={<QuizResult />} />  */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;