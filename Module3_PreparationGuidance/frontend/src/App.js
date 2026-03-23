import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResourceList from './components/ResourceList';
import ResourceForm from './components/ResourceForm';
import ChecklistList from './components/ChecklistList';
import ChecklistForm from './components/ChecklistForm';
import ChecklistDetail from './components/ChecklistDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ResourceList />} />
          <Route path="/resources/create" element={<ResourceForm />} />
          <Route path="/checklists" element={<ChecklistList />} />
          <Route path="/checklists/create" element={<ChecklistForm />} />
          <Route path="/checklists/:id" element={<ChecklistDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
