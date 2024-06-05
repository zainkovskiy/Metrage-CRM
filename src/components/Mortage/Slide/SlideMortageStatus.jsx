import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { SliderBlock } from '../../../styles/slider';
import { changeMortageStage } from '../../../store/slices/mortageSlice';
import { CheckboxUI } from 'ui/CheckboxUI';
import { setConsultation } from '../../../api/mortageAPI';

const SlideMortageStatus = () => {
  const dispatch = useDispatch();
  const mortage = useAsyncValue();
  const { mortgageCreate } = useSelector((state) => state.user);
  const [activeStepper, setActiveStepper] = useState(
    parseInt(mortage?.stageId) || 0
  );
  const changeStepper = (idx) => {
    dispatch(
      changeMortageStage({
        UID: mortage.UID,
        stageId: idx,
      })
    );
    setActiveStepper(idx);
  };
  const setFailure = () => {
    if (activeStepper === 7) {
      changeStepper(0);
      return;
    }
    changeStepper(7);
  };
  const handleConsultation = (e) => {
    const checked = e.target.checked;
    setConsultation(checked, mortage.UID);
  };
  return (
    <SliderBlock>
      <Box fullWidth column>
        <StatusBar
          activeStep={activeStepper}
          disabled={!mortgageCreate || activeStepper === 7}
          wrap
          fullWidth
        >
          <StatusBarItem title='Новая' onClick={changeStepper} />
          <StatusBarItem title='Сбор док-ов' onClick={changeStepper} />
          <StatusBarItem title='Отправлена' onClick={changeStepper} />
          <StatusBarItem title='Клиент одобрен' onClick={changeStepper} />
          <StatusBarItem title='Согл-ие объекта' onClick={changeStepper} />
          <StatusBarItem title='Объект одобрен' onClick={changeStepper} />
          <StatusBarItem title='Выдан' onClick={changeStepper} />
          <StatusBarItem title='Срыв' onClick={changeStepper} />
        </StatusBar>
        <Box jc='space-between' fullWidth>
          <CheckboxUI
            size='small'
            labelSize={12}
            defaultChecked={mortage?.isConsultation || false}
            onChange={handleConsultation}
            label='Консультация проведена'
          />
          {mortgageCreate && (
            <ButtonLink onClick={setFailure} size={12}>
              {activeStepper === 7 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
            </ButtonLink>
          )}
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideMortageStatus;
