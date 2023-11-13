import React, { useState } from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Plus } from 'images/plus.svg';
import { useAsyncValue } from 'react-router-dom';
import SideDealUser from './SideDealUser';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { addUserSide, removeUserSide } from '../../../api/dealAPI';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SlideParticipants = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  height: 150px;
  overflow: auto;
`;
const SlideDealParticipants = () => {
  const [change, setChange] = useState(false);
  const [addSideWindow, setAddSideWindow] = useState(null);
  const deal = useAsyncValue();
  const openSideWindow = (side) => {
    setAddSideWindow(side);
  };
  const closeRealtorWindow = () => {
    setAddSideWindow(null);
  };
  const addNewUser = (user) => {
    const find = deal[addSideWindow].find(
      (currentRealtor) => currentRealtor.UID.toString() === user.UID.toString()
    );
    if (find) {
      return;
    }
    addUserSide(
      {
        UID: deal.UID,
        userId: user.UID,
      },
      addSideWindow
    ).then((answer) => {
      if (answer === 'OK') {
        deal[addSideWindow].push(user);
        // setChange(!change);
        setAddSideWindow(null);
      }
    });
  };
  const removeUser = (user, source) => {
    removeUserSide({
      UID: deal.UID,
      userId: user.UID,
      type: user.type,
    }).then((answer) => {
      if (answer === 'OK') {
        deal[source] = deal[source].filter(
          (currentRealtor) => currentRealtor.UID !== user.UID
        );
        setChange(!change);
      }
    });
  };
  return (
    <>
      <SlideGridWrapper>
        <SlideBlockStyle $column>
          <FeatureTitle>
            Риелторы
            <IconButton onClick={() => openSideWindow('realtors')}>
              <Plus />
            </IconButton>
          </FeatureTitle>
          <SlideParticipants>
            {deal?.realtors?.length > 0 &&
              deal.realtors.map((realtor) => (
                <SideDealUser
                  user={realtor}
                  key={realtor?.UID}
                  type='realtor'
                  removeUser={removeUser}
                  dealUID={deal.UID}
                />
              ))}
          </SlideParticipants>
        </SlideBlockStyle>
        <SlideBlockStyle $column>
          <FeatureTitle>
            Юристы
            <IconButton onClick={() => openSideWindow('lawyers')}>
              <Plus />
            </IconButton>
          </FeatureTitle>
          <SlideParticipants>
            {deal?.lawyers?.length > 0 &&
              deal.lawyers.map((lawyer) => (
                <SideDealUser
                  user={lawyer}
                  key={lawyer?.UID}
                  removeUser={removeUser}
                  type='lawyer'
                  dealUID={deal.UID}
                />
              ))}
          </SlideParticipants>
        </SlideBlockStyle>
      </SlideGridWrapper>
      <DialogWindow open={Boolean(addSideWindow)} onClose={closeRealtorWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder
            onClose={closeRealtorWindow}
            onChange={addNewUser}
            title={
              addSideWindow === 'realtors'
                ? 'Добавить риэлтора'
                : 'Добавить юриста'
            }
          />
        </div>
      </DialogWindow>
    </>
  );
};

export default SlideDealParticipants;
