import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage } from 'store/applicationSlice';
import { ButtonLink } from 'ui/ButtonLink';
import TaskReasonFailure from './TaskReasonFailure';
import styled from 'styled-components';
import { device } from 'styles/device';
import { StatusBar, StatusBarItem } from '../../ui/StatusBar/StatusBar';
import { SliderBlock } from '../../styles/slider';

const TaskStatusStyle = styled(SliderBlock)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  // @media ${device.tablet} {
  //   flex-direction: column;
  //   align-items: flex-start;
  //   gap: 0.5rem;
  // }
`;

const TaskStatus = ({ status, UID }) => {
  const dispatch = useDispatch();
  const isExternal = useSelector((state) => state.user.isExternal);
  const [reason, setReason] = useState(false);
  const [activeStepper, setActiveStepper] = useState(status - 1 || '');
  const changeStepper = (idx, comment) => {
    dispatch(
      changeStage({
        stage: idx + 1,
        UID: UID,
        comment: comment,
      })
    );
    setActiveStepper(idx);
  };
  const setFailure = (comment) => {
    changeStepper(-1, comment);
    setReason(false);
  };
  const changeFailure = () => {
    if (activeStepper < 0) {
      changeStepper(0);
      return;
    }
    setReason(!reason);
  };
  return (
    <TaskStatusStyle>
      <StatusBar
        activeStep={activeStepper}
        disabled={activeStepper < 0 || isExternal === '1'}
        fullWidth
        wrap
      >
        <StatusBarItem title='Заявка создана' onClick={changeStepper} />
        <StatusBarItem title='В работе' onClick={changeStepper} />
        <StatusBarItem title='Успешно' onClick={changeStepper} />
      </StatusBar>
      <div style={{ position: 'relative', display: 'flex' }}>
        <ButtonLink onClick={changeFailure} size={12}>
          {activeStepper < 0 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
        </ButtonLink>
        {reason && (
          <TaskReasonFailure onClose={changeFailure} setFailure={setFailure} />
        )}
      </div>
    </TaskStatusStyle>
  );
};

export default TaskStatus;
