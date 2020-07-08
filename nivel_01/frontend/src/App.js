import React, { Component } from 'react';

import './App.css'

import backgroundImage from './backgound.jpg'

import Header from './components/Header.js'

function App() {
  return (
    <>
      <Header title="Homepage">
        <img width={300} src={backgroundImage} alt="" />
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>
      <Header title="Projects">
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  );
}

export default App;