import React, { useState } from 'react';
import styled from 'styled-components';
import TaskSlideStory from './TaskSlideStory';
import TaskSlideClientInfo from './TaskSlideClientInfo';
import TaskSlideAgentInfo from './TaskSlideAgentInfo';
import TaskStatus from './TaskStatus';
import { useSelector } from 'react-redux';
import TaskObjectInfo from './TaskObjectInfo';
import Loader from "components/Main/Loader";
import { ButtonUI } from 'ui/ButtonUI';
import DialogWindow from 'components/Main/DialogWindow';
import TaskChangeUser from './TaskChangeUser';
import BuySellEditForm from './BuySellEditForm';
import TaskSlideMeta from './TaskSlideMeta';
import TaskHandOver from './TaskHandOver';
import ApplicationCalls from './ApplicationCalls';


const TaskSlideStyle = styled.div`
  display: flex;
  height: 100%;
  gap: 0.5rem;
`
const TaskSlideContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  min-width: 450px;
`

const TaskSlide = () => {
  const isExternal = useSelector((state) => state.user.isExternal);
  const loadingTask = useSelector((state) => state.task.loadingTask);
  const task = useSelector((state) => state.task.openTask);
  const [openChange, setOpenChange] = useState(false);
  const [openHandOver, setOpenHandOver] = useState(false);
  const toggleOpenChange = () => {
    setOpenChange(!openChange);
  }
  const toggleOpenHandOver = () => {
    setOpenHandOver(!openHandOver)
  }
  return (
    <>
      <TaskSlideStyle>
        {
          loadingTask ?
            <Loader fill='#fff' /> :
            <>
              <TaskSlideContentStyle>
                <TaskSlideMeta
                  UID={task?.UID}
                  lostDate={task?.demand?.lostDate}
                  created={task?.created}
                  updated={task?.updated}
                />
                <TaskStatus
                  status={task?.status?.UID}
                  UID={task?.UID}
                />
                <TaskSlideClientInfo client={task?.client} demand={task?.demand}>
                  {
                    isExternal !== '1' &&
                    <ButtonUI size='small' onClick={toggleOpenHandOver}>Передать клиента</ButtonUI>
                  }
                </TaskSlideClientInfo>
                <TaskSlideAgentInfo responsible={task?.responsible} recommender={task?.recommender}>
                  {
                    isExternal !== '1' &&
                    <ButtonUI size='small' onClick={toggleOpenChange}>Сменить агента</ButtonUI>
                  }
                </TaskSlideAgentInfo>
                {
                  isExternal === '1' ?
                    <TaskObjectInfo /> :
                    <BuySellEditForm />
                }
                <ApplicationCalls calls={task?.calls}/>
              </TaskSlideContentStyle>
              <TaskSlideStory />
            </>
        }
      </TaskSlideStyle >
      <DialogWindow open={openChange} onClose={toggleOpenChange}>
        <TaskChangeUser
          onClose={toggleOpenChange}
          UID={task?.UID}
        />
      </DialogWindow>
      <DialogWindow open={openHandOver} onClose={toggleOpenHandOver}>
        <TaskHandOver
          onClose={toggleOpenHandOver}
          UID={task?.UID}
        />
      </DialogWindow>
    </>
  );
};

export default TaskSlide;
