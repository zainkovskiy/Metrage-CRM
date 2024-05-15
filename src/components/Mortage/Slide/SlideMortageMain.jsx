import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDateFormat } from 'hooks/DateFormat';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import SliderAvatar from './SliderAvatar';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeMortageUser } from '../../../store/slices/mortageSlice';

const MortageMain = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const MortageMainTextField = styled.div`
  align-self: center;
`;

const SlideMortageMain = () => {
  const { mortgageCreate } = useSelector((state) => state.user);
  const mortage = useAsyncValue();
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);

  const closeChangeWindow = () => {
    setTarget(null);
  };
  const changeTargetUser = (user) => {
    dispatch(
      changeMortageUser({
        UID: mortage.UID,
        type: target,
        userId: user.UID,
      })
    );
    mortage[target] = user;
    closeChangeWindow();
  };
  return (
    <SliderBlock>
      <SliderTitle>Общее</SliderTitle>
      <MortageMain>
        <SliderAvatar
          role='Клиент'
          avatarData={mortage.client}
          keySubtitle='phone'
        />
        <MortageMainTextField>
          <TextSpanStyle size={12} nowrap>
            Начало сбора документов:{' '}
            {mortage?.dateStartDocs
              ? useDateFormat(mortage.dateStartDocs, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12} nowrap>
            Дата одобрения клиента:{' '}
            {mortage?.dateApproveClient
              ? useDateFormat(mortage.dateApproveClient, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12} nowrap>
            Дата выдачи кредита:{' '}
            {mortage?.dateIssueCredit
              ? useDateFormat(mortage.dateIssueCredit, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
        </MortageMainTextField>
      </MortageMain>
      <MortageMain>
        <SliderAvatar
          role='Агент'
          isChangeButton={() => setTarget('realtor')}
          avatarData={mortage.realtor}
          keySubtitle='office'
        />
        <SliderAvatar
          role='Брокер'
          isChangeButton={mortgageCreate ? () => setTarget('broker') : false}
          avatarData={mortage.broker}
          keySubtitle='office'
        />
      </MortageMain>
      <DialogWindow open={Boolean(target)} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder onClose={closeChangeWindow} onChange={changeTargetUser} />
        </div>
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideMortageMain;
