import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import imgErrorUrl from 'images/img-error.svg';
import './style.scss';
import { Galary } from '@zainkovskiy/image-carousel-simple';

export const ImageGalary = ({ images, height }) => {
  const [full, setFull] = useState(false);
  return (
    // <ImageGallery
    //   items={images.map((img) => (
    //     {
    //       original: img.URL || imgErrorUrl,
    //       originalHeight: !full ? 250 : '',
    //       thumbnail: img.URL,
    //     }
    //   ))}
    //   onErrorImageURL={imgErrorUrl}
    //   showThumbnails={false}
    //   onScreenChange={(event) => setFull(event)}
    // />
    <Galary
      cover
      height={height}
      images={images.map((img) => ({
        url: img.URL || imgErrorUrl,
      }))}
    />
  );
};
