import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import './style.scss';

export const ImageGalary = ({ images }) => {
  const [full, setFull] = useState(false)
  return (
    <ImageGallery
      items={images.map((img) => (
        {
          original: img.URL,
          originalHeight: !full && 250,
          thumbnail: img.URL,
        }
      ))}
      showThumbnails={false}
      onScreenChange={(event) => setFull(event)}
    />
  );
};
