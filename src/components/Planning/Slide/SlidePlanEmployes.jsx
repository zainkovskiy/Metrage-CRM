import React from 'react';
import { useAsyncValue } from 'react-router-dom';

const SlidePlanEmployes = () => {
  const plan = useAsyncValue();
  console.log(plan);
  //FIXME: team not array
  return <div></div>;
};

export default SlidePlanEmployes;
