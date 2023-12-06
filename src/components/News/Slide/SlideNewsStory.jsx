import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideNewsStory = () => {
  const loader = false;
  const history = [];
  const sourceId = 1;
  const sendMessage = () => {};
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      source='news'
      sourceId={sourceId}
      // fullWidth={fullWidth}
      // height={height}
    />
  );
};

export default SlideNewsStory;
