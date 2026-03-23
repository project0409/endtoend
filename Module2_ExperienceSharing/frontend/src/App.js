import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExperienceList from './components/ExperienceList';
import ExperienceForm from './components/ExperienceForm';
import ExperienceDetail from './components/ExperienceDetail';
import MyExperiences from './components/MyExperiences';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ExperienceList />} />
          <Route path="/create" element={<ExperienceForm />} />
          <Route path="/edit/:id" element={<ExperienceForm />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/my-experiences" element={<MyExperiences />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
