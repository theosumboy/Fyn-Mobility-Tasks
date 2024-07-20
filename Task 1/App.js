// src/App.js
import React from 'react';
import './App.css';
import ImageGallery from './ImageGallery';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Infinite Scroll Image Gallery</h1>
      </header>
      <ImageGallery />
    </div>
  );
};

export default App;
