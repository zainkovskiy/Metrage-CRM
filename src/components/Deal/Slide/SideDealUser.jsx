import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import { ReactComponent as Coins } from 'images/coins.svg';
import { useNumberTriad } from 'hooks/StringHook';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogComission from './SlideDialogComission';
import SlideDialogCalculation from './SlideDialogCalculation';
import { setNewComission } from '../../../api/dealAPI';

const SlideParticipantsText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`;
const UserStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #cccccc;
  &:last-child {
    border: none;
  }
`;
const SideDealUser = (props) => {
  const { type } = props;
  const getSideComponent = () => {
    switch (type) {
      case 'realtor':
        return UserRealtor;
      case 'lawyer':
        return UserLawyer;
      default:
        return SimpleUser;
    }
  };
  const SideComponent = getSideComponent();
  return <SideComponent {...props} />;
};

const UserRealtor = ({
  user,
  removeUser,
  type,
  dealUID,
  changeUserComission,
}) => {
  const [isEditComission, setIsEditComission] = useState(false);
  const [calculationWindow, setCalculationWindow] = useState(null);
  const toggleEditComission = () => {
    setIsEditComission(!isEditComission);
  };
  const toggleCalculation = () => {
    setCalculationWindow(!calculationWindow);
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
        changeUserComission({
          userId: user.UID,
          comissionSize: data.comissionSize,
          type: type,
        });
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
      <UserStyle>
        <Box column ai='flex-start' gap='0'>
          <SlideParticipantsText size={12} nowrap>
            {user?.lastName} {user?.firstName} {user?.secondName}
          </SlideParticipantsText>{' '}
          <TextSpanStyle size={10}>
            Комиссия риелтора: {useNumberTriad(user?.comissionSize || '0')} руб.
          </TextSpanStyle>
        </Box>
        <Box jc='flex-start'>
          <IconButton onClick={toggleCalculation} color='gold'>
            <Coins />
          </IconButton>
          <IconButton onClick={toggleEditComission} color='info'>
            <Edit />
          </IconButton>
          <IconButton onClick={removeMySelf} color='error'>
            <Close />
          </IconButton>
        </Box>
      </UserStyle>
      <DialogWindow open={isEditComission} onClose={toggleEditComission}>
        <SlideDialogComission
          onClose={toggleEditComission}
          comission={user.comissionSize}
          onChange={changeNewComission}
          side={user.side}
          user={user}
          type={type}
        />
      </DialogWindow>
      <DialogWindow open={calculationWindow} onClose={toggleCalculation}>
        <SlideDialogCalculation
          onClose={toggleCalculation}
          user={user}
          type={type}
        />
      </DialogWindow>
    </>
  );
};
const UserLawyer = ({
  user,
  removeUser,
  type,
  dealUID,
  changeUserComission,
}) => {
  const [isEditComission, setIsEditComission] = useState(false);
  const [calculationWindow, setCalculationWindow] = useState(null);
  const toggleEditComission = () => {
    setIsEditComission(!isEditComission);
  };
  const toggleCalculation = () => {
    setCalculationWindow(!calculationWindow);
  };
  const changeNewComission = (data) => {
    setNewComission({
      UID: dealUID,
      userId: user.UID,
      ...data,
    }).then((answer) => {
      if (answer === 'OK') {
        user.comissionSize = data.comissionSize;
        changeUserComission({
          userId: user.UID,
          comissionSize: data.comissionSize,
          type: type,
        });
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
      'lawyers'
    );
  };
  return (
    <>
      <UserStyle>
        <Box column ai='flex-start' gap='0'>
          <SlideParticipantsText size={12} nowrap>
            {user?.lastName} {user?.firstName} {user?.secondName}
          </SlideParticipantsText>
          <TextSpanStyle size={10}>
            Оплата юриста: {useNumberTriad(user?.comissionSize || '0')} руб.
          </TextSpanStyle>
        </Box>
        <Box jc='flex-start'>
          <IconButton onClick={toggleEditComission} color='gold'>
            <Coins />
          </IconButton>
          <IconButton onClick={toggleEditComission} color='info'>
            <Edit />
          </IconButton>
          <IconButton onClick={removeMySelf} color='error'>
            <Close />
          </IconButton>
        </Box>
      </UserStyle>
      <DialogWindow open={isEditComission} onClose={toggleEditComission}>
        <SlideDialogComission
          onClose={toggleEditComission}
          comission={user.comissionSize}
          onChange={changeNewComission}
          side={user.side}
          user={user}
          type={type}
        />
      </DialogWindow>
      <DialogWindow open={calculationWindow} onClose={toggleCalculation}>
        <SlideDialogCalculation
          onClose={toggleCalculation}
          user={user}
          type={type}
        />
      </DialogWindow>
    </>
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
