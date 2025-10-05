import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>

    </BrowserRouter>
  );
}