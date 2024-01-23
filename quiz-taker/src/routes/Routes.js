import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeComponent from '../components/WelcomeComponent';
import QuestionComponent from '../components/QuestionComponent';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<WelcomeComponent />} />
        <Route path="/question" element={<QuestionComponent />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;