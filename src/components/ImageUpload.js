import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './ImageUpload.css'; 

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const base64Image = response.data.annotated_image;
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      // Create a new result object
      const newResult = {
        imageUrl,
        detections: response.data.detections,
      };

      // Prepend the new result to the existing results array
      setResults((prevResults) => [newResult, ...prevResults]); 
    } catch (error) {
      console.error("Error during inference:", error);
      setResults((prevResults) => [{ error: "Error during inference" }, ...prevResults]); 
    }
  };

  return (
    <div style={{ marginLeft: "36%" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload and Detect</button>
      </form>
      <div className="result-container">
        <h2 style={{marginLeft:'13%'}}>Output Image:</h2>
        {results.map((result, index) => (
          <div key={index} className="result-item" style={{ display: 'flex', marginBottom: '20px' }}>
            {result.imageUrl && (
              <div className="result-image" style={{ marginRight: '20px' }}>
                <img 
                  src={result.imageUrl} 
                  alt={`Result ${index + 1}`} 
                  className="image-large" 
                  style={{ maxHeight: '400px' }} 
                />
              </div>
            )}
            {result.detections && result.detections.length > 0 && (
              <div className="result-info">
                {result.detections.slice().reverse().map((detection, i) => (
                  <div key={i} className="detection" style={{ marginBottom: '37px', width: '100%' }}>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">Class:</span>
                      <span className="detection-content">{detection.class}</span>
                    </div>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">Confidence:</span>
                      <span className="detection-content">{detection.confidence.toFixed(2)}</span>
                    </div>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">Width:</span>
                      <span className="detection-content">{detection.width}</span>
                    </div>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">Height:</span>
                      <span className="detection-content">{detection.height}</span>
                    </div>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">X:</span>
                      <span className="detection-content">{detection.x}</span>
                    </div>
                    <div className="detection-item" style={{ display: 'block' }}>
                      <span className="detection-title">Y:</span>
                      <span className="detection-content">{detection.y}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {result.error && (
              <div className="error-message">
                {result.error}
              </div>
            )}
          </div>
        ))}
      </div>
      <nav style={{ marginTop: '50px',marginLeft:'14%' }}>
        <Link to="/videos">Go to Video Upload</Link>
      </nav>
    </div>
  );
}

export default ImageUpload;
