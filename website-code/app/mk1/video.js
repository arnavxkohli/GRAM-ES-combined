import React from 'react';

const Video = ({ videoId }) => {
  return (
    <div className="video-container">
      <iframe
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
