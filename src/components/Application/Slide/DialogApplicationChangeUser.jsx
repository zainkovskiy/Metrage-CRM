import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeAgent } from 'store/applicationSlice';
import { useNavigate } from 'react-router-dom';
import UserFinder from '../../Main/UserFinder';

const ApplicationChangeUserStyle = styled.div``;

const DialogApplicationChangeUser = ({ onClose, UID }) => {
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
    <ApplicationChangeUserStyle onClick={(e) => e.stopPropagation()}>
      <UserFinder onClose={onClose} onChange={changeUser} />
    </ApplicationChangeUserStyle>
  );
};

export default DialogApplicationChangeUser;
