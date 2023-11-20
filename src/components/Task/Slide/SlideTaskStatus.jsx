import React, { useState } from 'react';
import { StatusBar, StatusBarItem } from 'ui/StatusBar/StatusBar';
import { SliderBlock } from '../../../styles/slider';
import { setDealStage } from '../../../api/dealAPI';
import { setTaskStage } from '../../../api/taskApi';

const SlideTaskStatus = ({ status, UID }) => {
  const [activeStepper, setActiveStepper] = useState(status);

  const changeStepper = (idx) => {
    setTaskStage({
      stageId: idx,
      UID: UID,
    });
    setActiveStepper(idx);
  };
  return (
    <SliderBlock>
      <StatusBar activeStep={activeStepper} disabled={activeStepper < 0} wrap>
        <StatusBarItem title='Архив' onClick={changeStepper} />
        <StatusBarItem title='Новые' onClick={changeStepper} />
        <StatusBarItem title='Выбранные' onClick={changeStepper} />
        <StatusBarItem title='Анализ' onClick={changeStepper} />
        <StatusBarItem title='В работе' onClick={changeStepper} />
        <StatusBarItem title='Тестирование' onClick={changeStepper} />
        <StatusBarItem title='Завершено' onClick={changeStepper} />
      </StatusBar>
    </SliderBlock>
  );
};

export default SlideTaskStatus;
