import React, { useState } from 'react';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import TaskSlideBar from '../../Application/TaskSlideBar';
import TaskSlideBarItem from '../../Application/TaskSlideBarItem';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
const SlideDealStatus = () => {
  const [activeStepper, setActiveStepper] = useState(0);
  const changeStepper = (idx) => {
    setActiveStepper(idx);
  };
  return (
    <SlideBlockStyle>
      <SlideGridWrapper $fullWidth>
        <TaskSlideBar activeStep={activeStepper} disabled={false} column>
          <TaskSlideBarItem
            title='Закрепление по сделки'
            onClick={changeStepper}
          />
          <TaskSlideBarItem title='Допуск получен' onClick={changeStepper} />
          <TaskSlideBarItem title='Сделка состоялась' onClick={changeStepper} />
          <TaskSlideBarItem title='Акт подпписан' onClick={changeStepper} />
          <TaskSlideBarItem title='К расчету допущен' onClick={changeStepper} />
        </TaskSlideBar>
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
