import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import WelcomeComponent from '../components/WelcomeComponent';
import QuestionComponent from '../components/QuestionComponent';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomeComponent />} />
        <Route path="/question" element={<QuestionComponent />} />
        {/* Add more routes as needed */}
      </Routes>
      <Navigate from="/" to="/welcome" exact />
    </Router>
  );
};

export default AppRoutes;