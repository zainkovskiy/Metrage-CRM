import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import imgErrorUrl from 'images/img-error.svg';
import './style.scss';

export const ImageGalary = ({ images }) => {
  const [full, setFull] = useState(false)
  return (
    <ImageGallery
      items={images.map((img) => (
        {
          original: img.URL || imgErrorUrl,
          originalHeight: !full ? 250 : '',
          thumbnail: img.URL,
        }
      ))}
      onErrorImageURL={imgErrorUrl}
      showThumbnails={false}
      onScreenChange={(event) => setFull(event)}
    />
  );
};