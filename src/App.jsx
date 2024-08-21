import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'; // We'll create this later
import TakeQuiz from './components/Quiz/TakeQuiz';
import QuizResult from './components/Quiz/QuizResult';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './utils/auth';
import Header from './components/common/Header';
import CreateQuiz from './components/Dashboard/CreateQuizModal';
import QuizAnalytics from './components/Dashboard/QuizAnalytics';
import './App.css'


function App() {
  useEffect(()=>console.log("bro"),[])
  const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Add this line to access the context
  
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  return (
    <div style={{backgroundColor:'red',display:'flex',flex:1,height:'100vh'}}>
      <AuthProvider >
      <Router>
       <Header />
        <ToastContainer /> 
        <div style={{display:'flex',flex:3,backgroundColor:'#EDEDED'}}><Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* Redirect to /home */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }/>
          <Route // Protected route for Create Quiz
              path="/createQuiz"
              element={
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              }
            />
          <Route // Protected route for Create Quiz
              path="/analytics"
              element={
                <ProtectedRoute>
                  <QuizAnalytics />
                </ProtectedRoute>
              }
            />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
          {/* <Route path="/quiz/result/:id" element={<QuizResult />} />  */}
          {/* Add other routes as needed */}
        </Routes>
        </div>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;