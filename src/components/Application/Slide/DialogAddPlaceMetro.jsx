import React, { useState } from 'react';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import { getMetroList } from '../../../api/search';

const DialogAddPlaceMetro = ({ handleChange, metro }) => {
  const [loading, setLoading] = useState(false);
  const [metroList, setMetroList] = useState([]);

  const getMetro = (value) => {
    if (value.length < 2) {
      setMetroList([]);
      return;
    }
    setLoading(true);
    getMetroList(value)
      .then((data) => {
        setMetroList(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SelectAutoсompleteMultipleUI
      small
      options={metroList}
      placeholder='Метро'
      inputChange={getMetro}
      loading={loading}
      defaultValue={[]}
      getOptionsLabel={(options) =>
        `(${options.metroLine || ''}) ${options.metroName || ''}`
      }
      onChange={handleChange}
      isOpenOptions={(open) => !open && setMetroList([])}
      value={metro}
      label='Метро'
    />
  );
};

export default DialogAddPlaceMetro;
