import React from 'react';
import './index.css'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Adjust these imports to your actual file locations
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Fallback for unknown paths */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
