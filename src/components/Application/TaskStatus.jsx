import React, { useState } from 'react';
import { TaskBlockStyle } from './TaskStyle';
import TaskSlideBar from './TaskSlideBar';
import TaskSlideBarItem from './TaskSlideBarItem';
import { useDispatch, useSelector } from 'react-redux';
import { changeStage } from 'store/taskSlice';
import { ButtonLink } from 'ui/ButtonLink';
import TaskReasonFailure from './TaskReasonFailure';

const TaskStatus = ({ status, UID }) => {
  const dispatch = useDispatch();
  const isExternal = useSelector((state) => state.user.isExternal);
  const [reason, setReason] = useState(false);
  const [activeStepper, setActiveStepper] = useState(status - 1 || '');
  const changeStepper = (idx, comment) => {
    dispatch(changeStage({
      stage: idx + 1,
      UID: UID,
      comment: comment,
    }));
    setActiveStepper(idx);
  }
  const setFailure = (comment) => {
    changeStepper(-1, comment);
    setReason(false);
  }
  const changeFailure = () => {
    if (activeStepper < 0) {
      changeStepper(0);
      return
    }
    setReason(!reason);
  }
  return (
    <TaskBlockStyle
      jc='space-between'
      gap='1rem'
    >
      <TaskSlideBar activeStep={activeStepper} disabled={activeStepper < 0 || isExternal === '1'} fullWidth>
        <TaskSlideBarItem title='Заявка создана' onClick={changeStepper} />
        <TaskSlideBarItem title='В работе' onClick={changeStepper} />
        <TaskSlideBarItem title='Успешно' onClick={changeStepper} />
      </TaskSlideBar>
      <div style={{ position: 'relative', display: 'flex' }}>
        <ButtonLink onClick={changeFailure} size={12}>{activeStepper < 0 ? 'Вернуть из срыва' : 'Отправить в Срыв'}</ButtonLink>
        {
          reason &&
          <TaskReasonFailure
            onClose={changeFailure}
            setFailure={setFailure}
          />
        }
      </div>
    </TaskBlockStyle>
  );
};

export default TaskStatus;