import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseExperiences from './pages/BrowseExperiences';
import ShareExperience from './pages/ShareExperience';
import SkillAssessment from './pages/SkillAssessment';
import Recommendations from './pages/Recommendations';
import PreparationGuide from './pages/PreparationGuide';
import MyExperiences from './pages/MyExperiences';

// Styles
import './styles/global.css';

const AppContent = () => {
  const { checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/browse-experiences"
        element={
          <ProtectedRoute>
            <BrowseExperiences />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/share-experience"
        element={
          <ProtectedRoute>
            <ShareExperience />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/skill-assessment"
        element={
          <ProtectedRoute>
            <SkillAssessment />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/preparation-guide"
        element={
          <ProtectedRoute>
            <PreparationGuide />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/my-experiences"
        element={
          <ProtectedRoute>
            <MyExperiences />
          </ProtectedRoute>
        }
      />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
