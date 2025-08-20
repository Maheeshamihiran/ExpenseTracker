import React, { useState, useEffect } from 'react';
import App from './App';
import LoginPage from './components/loginpage/LoginPageNew';

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const loginStatus = localStorage.getItem('isLoggedIn');
    
    if (token && loginStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <App onLogout={handleLogout} />;
}

export default AppWrapper;