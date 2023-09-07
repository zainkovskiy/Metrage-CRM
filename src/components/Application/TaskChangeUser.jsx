import React from 'react';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeAgent } from 'store/applicationSlice';
import { useNavigate } from 'react-router-dom';

const TaskChangeUserStyle = styled.div``;

const TaskChangeUser = ({ onClose, UID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeUser = (user) => {
    dispatch(
      changeAgent({
        UID: UID,
        responsibleId: user.UID,
      })
    ).then((res) => {
      if (res?.payload === 'OK') {
        setTimeout(() => {
          navigate(`/application/${UID}`, { replace: true });
        }, 300);
        onClose();
      }
    });
  };
  return (
    <TaskChangeUserStyle onClick={(e) => e.stopPropagation()}>
      <UserFinder onClose={onClose} onChange={changeUser} />
    </TaskChangeUserStyle>
  );
};

export default TaskChangeUser;
