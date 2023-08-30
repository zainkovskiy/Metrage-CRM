import React, { useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideClientStory = ({ fullWidth, height }) => {
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const sendMessage = () => {};
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      fullWidth={fullWidth}
      height={height}
    />
  );
};

export default SlideClientStory;
