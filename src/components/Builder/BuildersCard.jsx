import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';

const Building = styled(Link)`
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 10% 30% 1fr 1fr 1fr;
  border-top: 1px solid #787878;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  &:last-child {
    border-bottom: 1px solid #787878;
  }
`;
const BuilderLogo = styled.img`
  width: 70px;
  height: 70px;
  vertical-align: middle;
`;
const ButtonOffer = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
  border: 1px solid #787878;
  color: #787878;
  border-radius: 20px;
  min-width: 130px;
  text-align: center;
`;
const BuildersCard = ({ building }) => {
  return (
    <Building to={`${building.UID}`}>
      <BuilderLogo src={building?.logo} />
      <Box ai='flex-start' column gap='0'>
        <TextSpanStyle size={16}>
          {building?.name || 'Неизвестный'}
        </TextSpanStyle>
        <TextSpanStyle size={12} color='#787878'>
          {`${building?.devType},` || ''} Год основания:{' '}
          {building?.startDate || ''}
        </TextSpanStyle>
      </Box>
      <Box ai='flex-start' column gap='0'>
        <TextSpanStyle color='#787878'>Сдано</TextSpanStyle>
        <TextSpanStyle size={16} color='#85009e'>
          {building?.onProcess?.houses || 0} домов в{' '}
          {building?.onProcess?.JK || 0} ЖК
        </TextSpanStyle>
      </Box>
      <Box ai='flex-start' column gap='0'>
        <TextSpanStyle color='#787878'>Строится</TextSpanStyle>
        <TextSpanStyle size={16} color='#85009e'>
          {building?.build?.houses || 0} домов в {building?.build?.JK || 0} ЖК
        </TextSpanStyle>
      </Box>
      <Box>
        <ButtonOffer>{building?.countOffers || 0} предложения</ButtonOffer>
      </Box>
    </Building>
  );
};

export default BuildersCard;
