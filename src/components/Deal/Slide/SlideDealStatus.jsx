import React, { useState } from 'react';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { setDealStage } from '../../../api/dealAPI';

const SlideDealStatus = ({ status, UID }) => {
  const [activeStepper, setActiveStepper] = useState(parseInt(status) || 0);
  const changeStepper = (idx) => {
    setDealStage({
      StageId: activeStepper,
      UID: UID,
    });
    setActiveStepper(idx);
  };
  const setFailure = () => {
    if (activeStepper === 6) {
      changeStepper(0);
      return;
    }
    changeStepper(6);
  };
  const setFinally = () => {
    // if (activeStepper === 5) {
    //   changeStepper(0);
    //   return;
    // }
    changeStepper(5);
  };
  return (
    <SlideBlockStyle>
      <SlideGridWrapper $fullWidth>
        <StatusBar activeStep={activeStepper} disabled={false} column>
          <StatusBarItem title='Закрепление' onClick={changeStepper} />
          <StatusBarItem title='ПДКП (бронь)' onClick={changeStepper} />
          <StatusBarItem title='ДКП' onClick={changeStepper} />
          <StatusBarItem title='Акт подписан' onClick={changeStepper} />
          <StatusBarItem title='К расчету' onClick={changeStepper} />
          <StatusBarItem title='Агент расчитан' onClick={changeStepper} />
          <StatusBarItem title='Срыв' onClick={changeStepper} />
        </StatusBar>
        <Box column>
          <ButtonLink onClick={setFinally} size={12} color='green'>
            Агент расчитан
          </ButtonLink>
          <ButtonLink onClick={setFailure} size={12}>
            {activeStepper === 6 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
          </ButtonLink>
        </Box>
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SlideDealStatus;
