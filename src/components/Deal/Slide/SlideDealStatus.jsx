import React, { useState } from 'react';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { setDealStage } from '../../../api/dealAPI';

const SlideDealStatus = ({ status, UID, handlerIsDisgraced }) => {
  const [activeStepper, setActiveStepper] = useState(status - 1 || '');

  const changeStepper = (idx) => {
    setDealStage({
      StageId: idx + 1,
      UID: UID,
    });
    setActiveStepper(idx);
    handlerIsDisgraced(idx + 1);
  };
  const setFailure = () => {
    if (activeStepper < 0) {
      changeStepper(0);
      return;
    }
    changeStepper(-1);
  };
  return (
    <SlideBlockStyle>
      <SlideGridWrapper $fullWidth>
        <StatusBar
          activeStep={activeStepper}
          disabled={activeStepper < 0}
          column
        >
          <StatusBarItem title='Закрепление' onClick={changeStepper} />
          <StatusBarItem title='ПДКП (бронь)' onClick={changeStepper} />
          <StatusBarItem title='ДКП' onClick={changeStepper} />
          <StatusBarItem title='Акт подписан' onClick={changeStepper} />
          <StatusBarItem title='Оплачено' onClick={changeStepper} />
        </StatusBar>
        <Box column>
          <ButtonLink onClick={setFailure} size={12}>
            {activeStepper < 0 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
          </ButtonLink>
        </Box>
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SlideDealStatus;
