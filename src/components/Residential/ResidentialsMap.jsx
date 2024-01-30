import React from 'react';
import { useSelector } from 'react-redux';

const ResidentialsMap = () => {
  const residentials = useSelector((state) => state.residential.residentials);
  console.log(residentials);
  return <div>map</div>;
};

export default ResidentialsMap;
