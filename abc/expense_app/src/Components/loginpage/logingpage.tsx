import React, { useState } from 'react';
import './logingpage.css';

interface LoginProps {
  onLogin: () => void;
  onGoToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.password) {
      onLogin();
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google OAuth logic here
  };

  const handleSignUpRedirect = () => {
    onGoToSignup();
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <span className="dollar-icon">$</span>
          <span className="brand-text">Expense Tracker</span>
        </div>
        
        <div className="quote-section">
          <p className="quote-text">
            "Let's get your budget back on track.
            <br />
            log in to continue managing your expenses."
          </p>
        </div>
        
        <div className="illustration">
          <img 
            src="abc\expense_app\src\components\loginpage\budget185-removebg-preview.png" 
            alt="Expense Tracker Illustration" 
            className="illustration-image"
          />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          
          <div className="divider">
            <span>or continue with</span>
          </div>
          
          <button onClick={handleGoogleLogin} className="google-btn">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login With Google
          </button>
          
          <div className="signup-link">
            <span>You Don't have Account?</span>
            <button onClick={handleSignUpRedirect} className="signup-redirect-btn">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;