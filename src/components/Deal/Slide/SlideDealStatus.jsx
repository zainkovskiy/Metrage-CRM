import React, { useState } from 'react';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
const SlideDealStatus = () => {
  const [activeStepper, setActiveStepper] = useState(0);
  const changeStepper = (idx) => {
    setActiveStepper(idx);
  };
  return (
    <SlideBlockStyle>
      <SlideGridWrapper $fullWidth>
        <StatusBar activeStep={activeStepper} disabled={false} column>
          <StatusBarItem
            title='Закрепление по сделки'
            onClick={changeStepper}
          />
          <StatusBarItem title='Допуск получен' onClick={changeStepper} />
          <StatusBarItem title='Сделка состоялась' onClick={changeStepper} />
          <StatusBarItem title='Акт подпписан' onClick={changeStepper} />
          <StatusBarItem title='К расчету допущен' onClick={changeStepper} />
        </StatusBar>
        <Box column>
          <ButtonLink onClick={() => {}} size={12} color='green'>
            Агент расчитан
          </ButtonLink>
          <ButtonLink onClick={() => {}} size={12}>
            {activeStepper < 0 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
          </ButtonLink>
        </Box>
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SlideDealStatus;
