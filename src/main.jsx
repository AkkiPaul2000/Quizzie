import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateQuiz from "./components/Dashboard/CreateQuiz";
import QuizAnalytics from "./components/Dashboard/QuizAnalytics";
import TakeQuiz from "./components/Quiz/TakeQuiz";
import QuizResult from "./components/Quiz/QuizResult";
import Sidebar from "./components/common/Sidebar"; // Import Sidebar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import QuestionAnalysis from "./components/Dashboard/QuestionAnalysis";
import { useState } from "react";
import { QuizProvider } from "./utils/quizContext";

const ProtectedRoute = ({ children, path }) => {
  const { isLoggedIn, user } = useAuth();
  console.log("login", isLoggedIn, "user", user);


  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="protected-route-container">
      <QuizProvider> 
      <Sidebar className="sidebar" />{" "}
      {/* Sidebar will only render for protected routes */}
      <div className="main-content">
        {/* Wrap protected routes with QuizProvider */}
          {children}
      </div>
      </QuizProvider>

    </div>
  );
};

const MainApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleOpenCreateQuizModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateQuizModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <AuthProvider>
        <div
          style={{
            backgroundColor: "#F2F2F2",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute path="/dashboard">
                  <Dashboard onOpenCreateQuizModal={handleOpenCreateQuizModal} />{" "}
                  {/* Pass the function to open the modal */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute path="/analytics">
                  <QuizAnalytics />
                </ProtectedRoute>
              }
            />
            <Route path="/quiz/:id" element={<TakeQuiz />} />
            <Route
              path="/analytics/:id"
              element={
                <ProtectedRoute path="/analytics/:id">
                  <QuestionAnalysis />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Conditionally render the CreateQuiz modal */}
          {isModalOpen && <CreateQuiz onClose={handleCloseCreateQuizModal} />}
        </div>
      </AuthProvider>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);