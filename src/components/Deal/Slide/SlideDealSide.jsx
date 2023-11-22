import React, { useState } from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import { IconButton } from 'ui/IconButton';
import SlideContacFind from './SlideContacFind';
import DialogWindow from 'components/Main/DialogWindow';

import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';
import { CategoryTranslate } from '../keyTranslate';
import { ReactComponent as Plus } from 'images/plus.svg';
import SideDealUser from './SideDealUser';
import { addContactSide, removeContactSide } from '../../../api/dealAPI';
const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const FeatureSubTitle = styled(FeatureTitle)`
  font-size: 12px;
`;
const FeatureClientList = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  height: 150px;
  overflow: auto;
`;
const TextNavigate = styled(Link)`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const PhotoObject = styled.img`
  width: 100px;
  height: 100%;
  border-radius: 5px;
`;
const SlideDealSide = () => {
  const deal = useAsyncValue();
  const [contactFind, setFindContact] = useState(null);
  const [change, setChange] = useState(false);

  const openFindContact = (e) => {
    const id = e.target.id;
    setFindContact(id);
  };
  const closeFindContact = (source) => {
    setFindContact(null);
  };
  const addContactToSide = (newContact) => {
    const source = newContact?.type === 'seller' ? 'sellersSide' : 'buyersSide';
    addContactSide({
      UID: deal.UID,
      side: newContact?.type,
      contactId: newContact?.UID,
    }).then((answer) => {
      if (answer === 'OK') {
        deal[source] = [...deal[source], newContact];
        setChange(!change);
      }
    });
  };
  const removeContactFromSide = (currentContact) => {
    const source =
      currentContact?.type === 'seller' ? 'sellersSide' : 'buyersSide';
    removeContactSide({
      UID: deal.UID,
      contactId: currentContact?.UID,
      side: currentContact?.type,
    }).then((answer) => {
      if (answer === 'OK') {
        deal[source] = deal[source].filter(
          (user) => user.UID !== currentContact.UID
        );
        setChange(!change);
      }
    });
  };
  return (
    <>
      <SlideGridWrapper>
        <SlideBlockStyle $column jc='space-between'>
          <Box column fullWidth ai='flex-start'>
            <FeatureTitle>Продавец</FeatureTitle>
            <Box jc='flex-start' ai='normal'>
              {deal?.objectParams?.photo && (
                <PhotoObject src={deal?.objectParams?.photo || null} />
              )}
              <Box column ai='flex-start' jc='space-between'>
                <div>
                  {deal?.dealType === 'simple' ? (
                    <TextNavigate
                      to={`/objects/${deal?.objectParams?.type}/${deal?.objectParams?.UID}`}
                    >
                      {deal?.objectParams?.street} {deal?.objectParams?.house}
                    </TextNavigate>
                  ) : (
                    <TextSpanStyle size={12}>
                      {deal?.objectParams?.street} {deal?.objectParams?.house}
                    </TextSpanStyle>
                  )}
                  <TextSpanStyle size={10}>
                    {deal?.objectParams?.city}
                  </TextSpanStyle>
                </div>
                <div>
                  <TextSpanStyle size={10}>
                    Тип: {CategoryTranslate[deal?.objectParams?.Category]}
                  </TextSpanStyle>
                  <TextSpanStyle size={12}>
                    Цена: {useNumberTriad(deal?.objectParams?.Price || '0')}{' '}
                    руб.
                  </TextSpanStyle>
                  {deal?.objectParams?.TotalArea && (
                    <TextSpanStyle size={10}>
                      Площадь: {deal?.objectParams?.TotalArea || '0'} м2.
                    </TextSpanStyle>
                  )}
                </div>
              </Box>
            </Box>
          </Box>
          <Box column fullWidth>
            <Box fullWidth>
              <FeatureSubTitle>
                Клиенты
                <IconButton id='seller' onClick={openFindContact}>
                  <Plus />
                </IconButton>
              </FeatureSubTitle>
            </Box>
            <FeatureClientList>
              {deal?.sellersSide?.length > 0 &&
                deal.sellersSide.map((seller) => (
                  <SideDealUser
                    user={seller}
                    key={seller.UID}
                    type='seller'
                    removeUser={removeContactFromSide}
                  />
                ))}
            </FeatureClientList>
          </Box>
        </SlideBlockStyle>
        <SlideBlockStyle $column jc='space-between'>
          <Box column fullWidth>
            <FeatureTitle>Покупатель</FeatureTitle>
            <Box fullWidth ai='flex-start' column gap='0'>
              <TextNavigate
                size={12}
                to={`/application/${deal?.bidParams?.UID}`}
              >
                Заявка: {deal?.bidParams?.lastName || ''}{' '}
                {deal?.bidParams?.firstName || ''}{' '}
                {deal?.bidParams?.secondName || ''}
              </TextNavigate>
              <TextSpanStyle size={12}>
                Потребность: {deal?.bidParams?.type || ''}
              </TextSpanStyle>
            </Box>
          </Box>
          <Box column fullWidth>
            <Box fullWidth>
              <FeatureSubTitle>
                Клиенты
                <IconButton onClick={openFindContact} id='buyer'>
                  <Plus />
                </IconButton>
              </FeatureSubTitle>
            </Box>
            <FeatureClientList>
              {deal?.buyersSide?.length > 0 &&
                deal.buyersSide.map((buyer) => (
                  <SideDealUser
                    user={buyer}
                    key={buyer.UID}
                    type='buyer'
                    removeUser={removeContactFromSide}
                  />
                ))}
            </FeatureClientList>
          </Box>
        </SlideBlockStyle>
      </SlideGridWrapper>
      <DialogWindow onClose={closeFindContact} open={Boolean(contactFind)}>
        <SlideContacFind addContact={addContactToSide} type={contactFind} />
      </DialogWindow>
    </>
  );
};

export default SlideDealSide;
