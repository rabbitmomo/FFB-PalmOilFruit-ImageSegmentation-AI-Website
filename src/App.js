import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: 'white', minHeight: '100vh' }}> 
        <h1 style={{ marginLeft: '42%', marginTop:"3%",display: 'flex', alignItems: 'center' }}>
          <img 
            src="images/Logo.png" 
            alt="Chop N Go Logo" 
            style={{ width: '50px', height: '50px', marginRight: '10px' }} 
          />
          Chop N Go
        </h1>
        <Routes>
          <Route path="/" element={<ImageUpload />} />
          <Route path="/videos" element={<VideoUpload />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
