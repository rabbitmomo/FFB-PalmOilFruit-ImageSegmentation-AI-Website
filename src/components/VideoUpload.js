import React, { useState } from 'react';
import axios from 'axios';
import './VideoUpload.css'; 
import { Link } from 'react-router-dom'; 

function VideoUpload() {
    const [video, setVideo] = useState(null);
    const [outputVideoUrl, setOutputVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showVideo, setShowVideo] = useState(false); 

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
        setOutputVideoUrl(null); 
        setError(null); 
        setShowVideo(false); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        const formData = new FormData();
        formData.append('video', video);

        try {

            // Set a timeout to show the video after 3 seconds
            setTimeout(() => {
                setShowVideo(true);
            }, 3000);
            
            const response = await axios.post('http://localhost:5000/detect-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const videoUrl = response.data.video_url; 
            setOutputVideoUrl(videoUrl);
            setError(null); 

        } catch (err) {
            console.error("Error during video inference:", err);
            setError("Error during video inference. Please try again.");
            setOutputVideoUrl(null); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div >
            <form style={{ marginLeft: "36%" }} onSubmit={handleSubmit}>
                <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={handleVideoChange} />
                <button type="submit" disabled={!video || loading}>Upload and Detect</button>
            </form>
            {loading && <p style={{ marginLeft: "36%" }}>Processing video...</p>}
            {error && <div className="error-message">{error}</div>}
            <div className="result-container" >
                <h2 style={{marginLeft:'45%'}}>Output Video:</h2>
                {showVideo && ( 
                    <video style={{ marginLeft: "28.5%" }} width="640" height="480" controls >
                        <source src="/videos/output_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <nav style={{ marginTop: '50px',marginLeft:'43%' }}>
                <Link to="/">Go to Image Upload</Link> 
            </nav>
        </div>
    );
}

export default VideoUpload;
