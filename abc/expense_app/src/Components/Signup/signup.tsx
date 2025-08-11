import React, { useState } from 'react';
import './signup.css';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    console.log('Sign up data:', formData);
    // Add your signup logic here
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Add Google OAuth logic here
  };

  const handleSignInRedirect = () => {
    console.log('Redirect to sign in');
    // Add navigation logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="brand">
          <span className="dollar-icon">$</span>
          <span className="brand-text">Expense Tracker</span>
        </div>
        
        <div className="illustration">
          <div className="background-shapes">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
          </div>
          
          <div className="main-elements">
            <div className="clipboard">
              <div className="clipboard-header"></div>
              <div className="clipboard-content">
                <div className="pie-chart">
                  <div className="pie-center">
                    <span className="dollar-symbol">$</span>
                  </div>
                </div>
                <div className="chart-bars">
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                </div>
              </div>
            </div>
            
            <div className="calculator">
              <div className="calc-display">655000</div>
              <div className="calc-buttons">
                <div className="calc-row">
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                </div>
                <div className="calc-row">
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                </div>
                <div className="calc-row">
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                  <div className="calc-btn"></div>
                </div>
              </div>
            </div>
            
            <div className="coins">
              <div className="coin coin-1"></div>
              <div className="coin coin-2"></div>
              <div className="coin coin-3"></div>
            </div>
            
            <div className="people">
              <div className="person person-1">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
              <div className="person person-2">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
            </div>
            
            <div className="magnifying-glass">
              <div className="glass-circle"></div>
              <div className="glass-handle"></div>
            </div>
            
            <div className="receipt">
              <div className="receipt-lines">
                <div className="receipt-line"></div>
                <div className="receipt-line"></div>
                <div className="receipt-line"></div>
                <div className="receipt-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-form-container">
          <h2 className="signup-title">Create a Account</h2>
          
          <form onSubmit={handleSubmit} className="signup-form">
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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
            
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
          
          <div className="divider">
            <span>or continue with</span>
          </div>
          
          <button onClick={handleGoogleSignUp} className="google-btn">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign Up With Google
          </button>
          
          <div className="signin-link">
            <span>Already Have Account?</span>
            <button onClick={handleSignInRedirect} className="signin-redirect-btn">
              Signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;