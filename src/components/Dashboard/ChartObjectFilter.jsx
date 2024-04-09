import React, { useRef } from 'react';
import { ButtonUI } from '../../ui/ButtonUI/ButtonUI';
import { InputUI } from '../../ui/InputUI/InputUI';
import { Box } from '../../ui/Box/Box';
import { useDispatch } from 'react-redux';
import { setNewRange } from '../../store/dashboardSlice';

const ChartObjectFilter = ({ chartName }) => {
  const periodFromRef = useRef(null);
  const periodToRef = useRef(null);
  const dispatch = useDispatch();
  const setNewPeriod = () => {
    dispatch(
      setNewRange({
        APIName: chartName,
        periodFrom: periodFromRef.current.value,
        periodTo: periodToRef.current.value,
      })
    );
  };
  return (
    <Box ai='flex-end'>
      <InputUI
        ref={periodFromRef}
        fullWidth
        small
        type='date'
        label='Период, от'
        labelSize={12}
      />
      <InputUI
        ref={periodToRef}
        fullWidth
        small
        type='date'
        label='Период, до'
        labelSize={12}
      />
      <ButtonUI size='small' onClick={setNewPeriod}>
        Применить
      </ButtonUI>
    </Box>
  );
};

export default ChartObjectFilter;
