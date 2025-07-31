// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PipeAnalysisIframe from "./pages/PipeAnalysisIframe";

<Route path="/pipe-analysis" element={<PipeAnalysisIframe />} />

const App: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={currentUser ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!currentUser ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
