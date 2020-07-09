import React, { useState, useEffect } from 'react';

import api from './services/api.js'

import './App.css'

import Header from './components/Header.js'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })

  }, [])

  return (
    <>
      <Header title="Projects">
      </Header>
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
    </>
  );
}

export default App;