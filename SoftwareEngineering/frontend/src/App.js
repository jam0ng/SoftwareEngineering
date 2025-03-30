// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import WordList from './components/WordList';
import MainPage from './components/MainPage';
import QuizStart from './components/QuizStart';
import QuizWord from './components/QuizWord';
import QuizResult from './components/QuizResult';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App" style={{ padding: '2rem' }}>
        <h1>🧠 TOEIC 단어 학습</h1>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wordlist" element={<WordList />} />
          <Route path="/quiz-start" element={<QuizStart />} />
          <Route path="/quiz" element={<QuizWord />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/" element={
            isLoggedIn ? (
              <MainPage user={user} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLoginSuccess} />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
