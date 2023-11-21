import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import SlideUserItems from './SlideUserItems';
import UserFinder from 'components/Main/UserFinder';
import DialogWindow from 'components/Main/DialogWindow';
import { device } from 'styles/device';
import {
  addCoresponsible,
  addObserver,
  removeCoresponsible,
  removeObserver,
  setCreator,
  setResponsible,
} from '../../../api/taskApi';

const SlideUserListStyle = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 250px;
  box-sizing: border-box;
  @media (${device.tablet}) {
    width: 100%;
  }
`;
const SlideTaskDetail = () => {
  const task = useAsyncValue();
  const [changeToggle, setChangeToggle] = useState(false);
  const [sourceChange, setSourceChange] = useState(null);
  const removeUser = (user) => {
    console.log(user);
    const raw = {
      UID: task?.UID,
      userId: user?.user?.UID,
    };
    user.source === 'coresponsible' && removeCoresponsible(raw);
    user.source === 'observers' && removeObserver(raw);
    task[user.source] = task[user.source].filter(
      (item) => item.UID !== user.user.UID
    );
    setChangeToggle(!changeToggle);
  };
  const openUserFinder = (source) => {
    setSourceChange(source);
  };
  const closeUserFinder = () => {
    setSourceChange(null);
  };
  const selectUser = (user) => {
    if (sourceChange === 'creatorId' || sourceChange === 'responsibleId') {
      sourceChange === 'creatorId' &&
        setCreator({
          UID: task?.UID,
          creator: user,
        });
      sourceChange === 'responsibleId' &&
        setResponsible({
          UID: task?.UID,
          responsible: user,
        });
      task[sourceChange] = user;
      closeUserFinder();
      return;
    }
    const raw = {
      UID: task?.UID,
      userId: user?.UID,
    };
    sourceChange === 'coresponsible' && addCoresponsible(raw);
    sourceChange === 'observers' && addObserver(raw);
    task[sourceChange] = [...task[sourceChange], user];
    closeUserFinder();
  };
  return (
    <SlideUserListStyle>
      <TextSpanStyle>
        Крайний срок: {useDateFormat(task?.duedate, 'DD.MM.YYYY')}
      </TextSpanStyle>
      <SlideUserItems
        title='Постановщик'
        users={[task?.creatorId]}
        buttonName='сменить'
        buttonOnClick={openUserFinder}
        source='creatorId'
        mode='wait'
      />
      <SlideUserItems
        title='Ответственный'
        users={[task?.responsibleId]}
        buttonName='сменить'
        buttonOnClick={openUserFinder}
        source='responsibleId'
        mode='wait'
      />
      <SlideUserItems
        title='Соисполнители'
        users={task?.coresponsible}
        buttonName='добавить'
        buttonOnClick={openUserFinder}
        isRemove
        source='coresponsible'
        cbRemove={removeUser}
      />
      <SlideUserItems
        title='Наблюдатели'
        users={task?.observers}
        buttonName='добавить'
        buttonOnClick={openUserFinder}
        isRemove
        source='observers'
        cbRemove={removeUser}
      />
      <DialogWindow onClose={closeUserFinder} open={Boolean(sourceChange)}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder onClose={closeUserFinder} onChange={selectUser} />
        </div>
      </DialogWindow>
    </SlideUserListStyle>
  );
};

export default SlideTaskDetail;
