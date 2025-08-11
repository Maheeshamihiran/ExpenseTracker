import React, { useState } from 'react';
import Login from './components/loginpage/logingpage';
import SignUp from './components/Signup/signup';
import App from './App';

type Page = 'login' | 'signup' | 'dashboard';

const AppRouter: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleGoToSignup = () => {
    setCurrentPage('signup');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onGoToSignup={handleGoToSignup} />;
  }

  if (currentPage === 'signup') {
    return <SignUp onSignup={handleLogin} onGoToLogin={handleGoToLogin} />;
  }

  return <App onLogout={handleLogout} />;
};

export default AppRouter;