import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loadTime, setLoadTime] = useState(null);
  const [imageLoadTimes, setImageLoadTimes] = useState({});

  useEffect(() => {
    const startTime = performance.now();

    fetch('https://api.unsplash.com/photos/?client_id=b1KjoRNXtrd8T_7ez79iHdP5zcEKF4b9fAIr0yFjM30')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        setLoadTime(timeElapsed);
        measureImageLoadTimes(data, startTime); 
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const measureImageLoadTimes = (images, startTime) => { 
    const imageLoadTimes = {};
    images.forEach(image => {
      const img = new Image();
      img.src = image.urls.small;
      img.onload = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        imageLoadTimes[image.id] = loadTime;
        setImageLoadTimes(imageLoadTimes);
      };
    });
  };

  return (
    <div>
      {loadTime && <div>Load Time: {loadTime.toFixed(2)} milliseconds&hearts;</div>}
      <div className="image-gallery">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            {imageLoadTimes[image.id] && (
              <div>Image Load Time: {imageLoadTimes[image.id].toFixed(2)} milliseconds&hearts;</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
