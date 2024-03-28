import React from 'react';
import './App.css';
import ImageGallery from './ImageGallery';
import LazyImage from './LazyImage';
import CriticalImagePreloader from './CriticalImagePreloader';

function App() {
  return (
    <div className="App">
      <h1>Image Gallery &hearts;</h1>
      <CriticalImagePreloader src="link_to_critical_image.jpg" />
      <LazyImage />
      <ImageGallery />
    </div>
  );
}

export default App;
