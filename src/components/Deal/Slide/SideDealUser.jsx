import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import { useNumberTriad } from 'hooks/StringHook';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogComission from './SlideDialogComission';
import { setNewComission } from '../../../api/dealAPI';

const SlideParticipantsText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SideDealUser = (props) => {
  const { type } = props;
  const getSideComponent = () => {
    switch (type) {
      case 'realtor':
        return UserRealtor;
      case 'lawyers':
        return UserLawyer;
      default:
        return SimpleUser;
    }
  };
  const SideComponent = getSideComponent();
  return <SideComponent {...props} />;
};

const UserRealtor = ({ user, removeUser, type, dealUID }) => {
  const [isEditComission, setIsEditComission] = useState(false);
  const toggleEditComission = () => {
    setIsEditComission(!isEditComission);
  };
  const changeNewComission = (data) => {
    setNewComission({
      UID: dealUID,
      userId: user.UID,
      ...data,
    }).then((answer) => {
      if (answer === 'OK') {
        user.comissionSize = data.comissionSize;
        user.size = data.size;
        toggleEditComission();
      }
    });
  };
  const removeMySelf = () => {
    removeUser(
      {
        ...user,
        type,
      },
      'realtors'
    );
  };
  return (
    <>
      <Box jc='space-between' ai='flex-start'>
        <Box column ai='flex-start' gap='0'>
          <SlideParticipantsText size={12} nowrap>
            {user?.lastName} {user?.firstName} {user?.secondName}
          </SlideParticipantsText>{' '}
          <TextSpanStyle size={10}>
            Комиссия риелтора: {useNumberTriad(user?.comissionSize || '0')} руб.
          </TextSpanStyle>
        </Box>
        <Box>
          <IconButton onClick={toggleEditComission} color='info'>
            <Edit />
          </IconButton>
          <IconButton onClick={removeMySelf} color='error'>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <DialogWindow open={isEditComission} onClose={toggleEditComission}>
        <SlideDialogComission
          onClose={toggleEditComission}
          comission={user?.comissionSize}
          onChange={changeNewComission}
          side={user.side}
        />
      </DialogWindow>
    </>
  );
};
const UserLawyer = ({ user, removeUser, type }) => {
  const removeMySelf = () => {
    removeUser(
      {
        ...user,
        type,
      },
      'lawyers'
    );
  };
  return (
    <Box jc='space-between'>
      <SlideParticipantsText size={12} nowrap>
        {user?.lastName} {user?.firstName} {user?.secondName}
      </SlideParticipantsText>{' '}
      <IconButton onClick={removeMySelf} color='error'>
        <Close />
      </IconButton>
    </Box>
  );
};
const SimpleUser = ({ user, type, removeUser }) => {
  const removeMySelf = () => {
    removeUser({
      ...user,
      type,
    });
  };
  return (
    <Box jc='space-between'>
      <SlideParticipantsText size={12} nowrap>
        {user?.lastName} {user?.firstName} {user?.secondName}
      </SlideParticipantsText>{' '}
      <IconButton onClick={removeMySelf} color='error'>
        <Close />
      </IconButton>
    </Box>
  );
};

export default SideDealUser;
