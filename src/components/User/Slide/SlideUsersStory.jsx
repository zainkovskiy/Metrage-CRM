import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideUsersStory = () => {
  const user = useAsyncValue();
  return <SliderStory source='user' sourceId={user.UID} type='users' />;
};

export default SlideUsersStory;
