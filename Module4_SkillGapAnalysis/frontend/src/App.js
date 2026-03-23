import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssessmentList from './components/AssessmentList';
import AssessmentForm from './components/AssessmentForm';
import AssessmentDetail from './components/AssessmentDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AssessmentList />} />
          <Route path="/create" element={<AssessmentForm />} />
          <Route path="/assessment/:id" element={<AssessmentDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
