import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Auth/Dashboard';
import Profile from './pages/Auth/Profile';
import ExperienceList from './pages/Experience/ExperienceList';
import ExperienceForm from './pages/Experience/ExperienceForm';
import ExperienceDetail from './pages/Experience/ExperienceDetail';
import MyExperiences from './pages/Experience/MyExperiences';
import ResourceList from './pages/Preparation/ResourceList';
import ResourceForm from './pages/Preparation/ResourceForm';
import ChecklistList from './pages/Preparation/ChecklistList';
import ChecklistForm from './pages/Preparation/ChecklistForm';
import ChecklistDetail from './pages/Preparation/ChecklistDetail';
import AssessmentList from './pages/SkillGap/AssessmentList';
import AssessmentForm from './pages/SkillGap/AssessmentForm';
import AssessmentDetail from './pages/SkillGap/AssessmentDetail';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          
          {/* Experience Sharing Routes */}
          <Route path="/experiences" element={isAuthenticated ? <ExperienceList /> : <Navigate to="/login" />} />
          <Route path="/experiences/create" element={isAuthenticated ? <ExperienceForm /> : <Navigate to="/login" />} />
          <Route path="/experiences/edit/:id" element={isAuthenticated ? <ExperienceForm /> : <Navigate to="/login" />} />
          <Route path="/experiences/:id" element={isAuthenticated ? <ExperienceDetail /> : <Navigate to="/login" />} />
          <Route path="/my-experiences" element={isAuthenticated ? <MyExperiences /> : <Navigate to="/login" />} />
          
          {/* Preparation Guidance Routes */}
          <Route path="/resources" element={isAuthenticated ? <ResourceList /> : <Navigate to="/login" />} />
          <Route path="/resources/create" element={isAuthenticated ? <ResourceForm /> : <Navigate to="/login" />} />
          <Route path="/checklists" element={isAuthenticated ? <ChecklistList /> : <Navigate to="/login" />} />
          <Route path="/checklists/create" element={isAuthenticated ? <ChecklistForm /> : <Navigate to="/login" />} />
          <Route path="/checklists/:id" element={isAuthenticated ? <ChecklistDetail /> : <Navigate to="/login" />} />
          
          {/* Skill Gap Analysis Routes */}
          <Route path="/assessments" element={isAuthenticated ? <AssessmentList /> : <Navigate to="/login" />} />
          <Route path="/assessments/create" element={isAuthenticated ? <AssessmentForm /> : <Navigate to="/login" />} />
          <Route path="/assessments/:id" element={isAuthenticated ? <AssessmentDetail /> : <Navigate to="/login" />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
