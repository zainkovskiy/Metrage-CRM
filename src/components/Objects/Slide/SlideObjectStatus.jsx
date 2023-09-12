import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { SliderBlock } from '../../../styles/slider';
import { changeObjectStage } from '../../../store/objectSlice';

const SlideObjectStatus = () => {
  const dispatch = useDispatch();
  const object = useAsyncValue();
  const [activeStepper, setActiveStepper] = useState(
    parseInt(object?.StageId) || 0
  );
  const changeStepper = (idx) => {
    dispatch(
      changeObjectStage({
        stage: idx,
        UID: object.UID,
        type: object?.typeEstate,
      })
    );
    setActiveStepper(idx);
  };
  const setFailure = () => {
    if (activeStepper == 4) {
      changeStepper(0);
      return;
    }
    changeStepper(4);
  };
  return (
    <SliderBlock>
      <Box fullWidth column ai='flex-end'>
        <StatusBar
          activeStep={activeStepper}
          disabled={!object?.isEditor || activeStepper < 0}
          wrap
          fullWidth
        >
          <StatusBarItem title='Черновик' onClick={changeStepper} />
          <StatusBarItem title='Активный' onClick={changeStepper} />
          <StatusBarItem title='Закрепление' onClick={changeStepper} />
          <StatusBarItem title='Продано' onClick={changeStepper} />
          <StatusBarItem title='Срыв' onClick={changeStepper} />
        </StatusBar>
        <ButtonLink onClick={setFailure} size={12}>
          {activeStepper === 4 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
        </ButtonLink>
      </Box>
    </SliderBlock>
  );
};

export default SlideObjectStatus;
