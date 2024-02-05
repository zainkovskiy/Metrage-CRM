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
import { useAsyncValue } from 'react-router-dom';
import { useGetAvatar } from 'hooks/MakeAvatar';

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
const Avatar = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
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
  const deal = useAsyncValue();
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
  const getPersent = () => {
    const percent = (
      (parseInt(user?.comissionSize) * 100) /
      parseInt(deal.agencyComission)
    ).toFixed(2);
    return percent;
  };
  const getPersentText = () => {
    if (!user?.comissionSize || user?.comissionSize <= 0) {
      return <TextSpanStyle size={10}>0% от общ. комиссии</TextSpanStyle>;
    }
    if (!deal?.agencyComission || deal?.agencyComission <= 0) {
      return <TextSpanStyle size={10}>0% от общ. комиссии</TextSpanStyle>;
    }
    return (
      <TextSpanStyle size={10}>{getPersent()}% от общ. комиссии</TextSpanStyle>
    );
  };
  return (
    <>
      <UserStyle>
        <Box column ai='flex-start' gap='0'>
          <Box>
            <Avatar
              src={useGetAvatar({
                avatar: user?.avatar,
                firstName: user?.firstName,
                lastName: user?.lastName,
              })}
            />
            <SlideParticipantsText size={12}>
              {user?.lastName} {user?.firstName} {user?.secondName}
            </SlideParticipantsText>{' '}
          </Box>
          <TextSpanStyle size={10}>
            Зарплата риелтора: {useNumberTriad(user?.comissionSize || '0')} руб.
          </TextSpanStyle>
          <TextSpanStyle size={10}>
            Выплачено: {useNumberTriad(user?.expense || '0')} руб.
          </TextSpanStyle>
          {getPersentText()}
        </Box>
        <Box jc='flex-start'>
          <IconButton
            onClick={toggleCalculation}
            color='gold'
            disabled={user?.comissionSize === 0 || getPersent() === '100.00'}
          >
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
  const deal = useAsyncValue();
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
  const getPersentText = () => {
    if (!user?.comissionSize || user?.comissionSize <= 0) {
      return <TextSpanStyle size={10}>0% от общ. комиссии</TextSpanStyle>;
    }
    if (!deal?.agencyComission || deal?.agencyComission <= 0) {
      return <TextSpanStyle size={10}>0% от общ. комиссии</TextSpanStyle>;
    }
    const percent = (
      (parseInt(user?.comissionSize) * 100) /
      parseInt(deal.agencyComission)
    ).toFixed(2);
    return <TextSpanStyle size={10}>{percent}% от общ. комиссии</TextSpanStyle>;
  };
  return (
    <>
      <UserStyle>
        <Box column ai='flex-start' gap='0'>
          <Box>
            <Avatar
              src={useGetAvatar({
                avatar: user?.avatar,
                firstName: user?.firstName,
                lastName: user?.lastName,
              })}
            />
            <SlideParticipantsText size={12}>
              {`${user?.lastName} ${user?.firstName} ${user?.secondName}`}
            </SlideParticipantsText>
          </Box>
          <TextSpanStyle size={10}>
            Зарплата юриста: {useNumberTriad(user?.comissionSize || '0')} руб.
          </TextSpanStyle>
          {getPersentText()}
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
