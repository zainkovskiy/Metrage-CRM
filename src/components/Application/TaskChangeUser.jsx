import React from 'react';
import UserFinder from 'components/Main/UserFinder';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeAgent } from 'store/taskSlice';

const TaskChangeUserStyle = styled.div`

`

const TaskChangeUser = ({ onClose, UID }) => {
  const dispatch = useDispatch();
  const changeUser = (user) => {
    dispatch(changeAgent({
      UID: UID,
      responsibleId: user.UID
    })).then((res) => {
      if (res?.payload === 'OK') {
        onClose();
      }
    })
  }
  return (
    <TaskChangeUserStyle onClick={(e) => e.stopPropagation()}>
      <UserFinder onClose={onClose} onChange={changeUser} />
    </TaskChangeUserStyle>
  );
};

export default TaskChangeUser;