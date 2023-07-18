import React from 'react';
import { ObjectSliderBox } from '../ObjectsStyle';
const FormRoom = () => {
  return (
    <>
      <ObjectSliderBox
        $column
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        room
      </ObjectSliderBox>
      <ObjectSliderBox
        $column
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button type='submit'>submit</button>
      </ObjectSliderBox>
    </>
  );
};

export default FormRoom;