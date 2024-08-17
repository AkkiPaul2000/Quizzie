import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'; // We'll create this later
import TakeQuiz from './components/Quiz/TakeQuiz';
import QuizResult from './components/Quiz/QuizResult';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider> 

    <Router>
      <Header />
      <ToastContainer /> 
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/quiz/result/:id" element={<QuizResult />} /> 
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;