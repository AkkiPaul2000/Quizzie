import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/auth';
import { BACKEND_URL } from '../../utils/constant';
import './Auth.css';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../common/Loader';
import AuthLoader from '../common/AuthLoader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverReady, setServerReady] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('/api/health'); // Replace with your health check endpoint
        if (response.ok) {
          setServerReady(true);
        } else {
          console.error('Error checking backend server readiness:', response.statusText);
          // Handle error, e.g., retry after a delay
        }
      } catch (error) {
        console.error('Error checking backend server readiness:', error);
        // Handle error, e.g., retry after a delay
      }
    };

    const retryInterval = setInterval(checkServer, 5000); // Retry every 5 seconds

    checkServer();

    return () => {
      clearInterval(retryInterval);
    };
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("submitted")
    setEmailError('');
    setPasswordError('');

    
    let isValid = true;

    if (!email) {
      setEmailError(' Please enter your email.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Plz enter your password.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
      login(response.data.token);  // Use login from useAuth
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Login failed. Please check your credentials and try again.');
    }
    finally{
      setLoading(false)
    }
  };

  const handleInputChange = (setter, errorSetter) => (e) => {
    setter(e.target.value);
    errorSetter('');  // Clear the specific error when the input changes
  };
  if(!serverReady)return <Loader/>
  return (
    <div className='LoginForm'>
      <div className="loginDiv">
        <h2>QUIZZIE</h2>
        <div className='switchButtons'>
          <div className='switchButton2' onClick={() => navigate('/register')}>Sign Up</div>
          <div className='switchButton1'>Log In</div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className='formInputs'>
            <div className='inputWrapper'>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange(setEmail, setEmailError)}
                className={emailError ? 'inputError' : ''}
              />
              {emailError && <span className='errorText'>{emailError}</span>}
            </div>
            <div className='inputWrapper'>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange(setPassword, setPasswordError)}
                className={passwordError ? 'inputError' : ''}
              />
              {passwordError && <span className='errorText'>{passwordError}</span>}
            </div>
          </div>
          <div className="buttonWrapper" style={{ position: 'relative' }}>
            <button type="submit" className='authButton' disabled={loading}>
              Login
              {loading && <AuthLoader small />} {/* Loader will appear on the right side */}
            </button>
          </div>        </form>
      </div>
    </div>
  );
};

export default Login;
