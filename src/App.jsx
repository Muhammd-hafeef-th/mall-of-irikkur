import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Catch-all route fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
