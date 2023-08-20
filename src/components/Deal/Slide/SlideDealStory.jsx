import React, { useEffect, useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideDealStory = ({ fullWidth, height }) => {
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const sendMessage = () => {

  }
  return (
    <SliderStory loader={loader} history={history} onChange={sendMessage} fullWidth={fullWidth} height={height} />
  );
};

export default SlideDealStory;