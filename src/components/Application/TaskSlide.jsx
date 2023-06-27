import React, { Suspense, useState } from 'react';
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
import { useAsyncValue } from 'react-router-dom';


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
  const application = useAsyncValue();
  const isExternal = useSelector((state) => state.user.isExternal);
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
        <TaskSlideContentStyle>
          <TaskSlideMeta
            UID={application?.UID}
            lostDate={application?.demand?.lostDate}
            created={application?.created}
            updated={application?.updated}
          />
          <TaskStatus
            status={application?.status?.UID}
            UID={application?.UID}
          />
          <TaskSlideClientInfo client={application?.client} demand={application?.demand}>
            {
              isExternal !== '1' &&
              <ButtonUI size='small' onClick={toggleOpenHandOver}>Передать клиента</ButtonUI>
            }
          </TaskSlideClientInfo>
          <TaskSlideAgentInfo responsible={application?.responsible} recommender={application?.recommender}>
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
          <ApplicationCalls calls={application?.calls} />
        </TaskSlideContentStyle>
        <TaskSlideStory UID={application?.UID}/>
      </TaskSlideStyle >
      <DialogWindow open={openChange} onClose={toggleOpenChange}>
        <TaskChangeUser
          onClose={toggleOpenChange}
          UID={application?.UID}
        />
      </DialogWindow>
      <DialogWindow open={openHandOver} onClose={toggleOpenHandOver}>
        <TaskHandOver
          onClose={toggleOpenHandOver}
          UID={application?.UID}
        />
      </DialogWindow>
    </>
  );
};

export default TaskSlide;
