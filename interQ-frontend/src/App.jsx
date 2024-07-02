import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResumePage from './components/ResumePage';
import SkillsPage from './components/SkillsPage';
import QuestionsPage from './components/QuestionsPage';
import './App.css';
import Chatbot from './components/ChatPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/select-resume" element={<ResumePage />} />
      <Route path="/select-skill" element={<SkillsPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/sqlBot" element={<Chatbot />} />
    </Routes>
  );
};

export default App;
