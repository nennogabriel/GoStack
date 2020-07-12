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

  async function handleAddProject() {

    const response = await api.post('/projects', {
      title: `novo projeto ${Date.now()}`,
      owner: 'Pedro Moreno'
    })

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects">
      </Header>
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;