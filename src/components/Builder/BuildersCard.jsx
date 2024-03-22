import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useNumberTriad } from '../../hooks/StringHook';

const BuilingLine = styled.tr`
  border-top: 1px solid #787878;
  cursor: pointer;
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #ccc;
    }
  }
  @media (hover: none) {
    &:active {
      background-color: #ccc;
    }
  }
  &:last-child {
    border-bottom: 1px solid #787878;
  }
`;
const BuilingCell = styled.td`
  ${({ $width }) => $width && `width: ${$width}`};
  box-sizing: border-box;
  padding: 0.5rem;
  &:not(:first-child) {
    padding-left: 0;
  }
`;
const BuilderLogo = styled.img`
  width: 100%;
  vertical-align: middle;
  object-fit: contain;
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
  white-space: nowrap;
`;
const BuildersCard = ({ building }) => {
  const navigate = useNavigate();
  const toNavigate = () => {
    navigate(`${building.UID}`);
  };
  return (
    <BuilingLine onClick={toNavigate}>
      <BuilingCell $width={'10%'}>
        <BuilderLogo src={building?.logo} />
      </BuilingCell>
      <BuilingCell $width={'30%'}>
        <Box ai='flex-start' column gap='0'>
          <TextSpanStyle size={16}>
            {building?.name || 'Неизвестный'}
          </TextSpanStyle>
          <TextSpanStyle size={12} color='#787878'>
            {`${building?.devType},` || ''} Год основания:{' '}
            {building?.startDate || ''}
          </TextSpanStyle>
        </Box>
      </BuilingCell>
      <BuilingCell>
        {building.devType === 'ИЖС' ? (
          <Box ai='flex-start' column gap='0'>
            <TextSpanStyle color='#787878'>Цена</TextSpanStyle>
            <TextSpanStyle nowrap size={16} color='#85009e'>
              от {useNumberTriad(building?.priceFrom || 0)} за м2
            </TextSpanStyle>
          </Box>
        ) : (
          <Box ai='flex-start' column gap='0'>
            <TextSpanStyle color='#787878'>Сдано</TextSpanStyle>
            <TextSpanStyle nowrap size={16} color='#85009e'>
              {building?.onProcess?.houses || 0} домов в{' '}
              {building?.onProcess?.JK || 0} ЖК
            </TextSpanStyle>
          </Box>
        )}
      </BuilingCell>
      <BuilingCell>
        {building.devType === 'ИЖС' ? (
          <Box ai='flex-start' column gap='0'>
            <TextSpanStyle color='#787878'>Материалы</TextSpanStyle>
            <TextSpanStyle nowrap size={16} color='#85009e'>
              {building?.materials || ''}
            </TextSpanStyle>
          </Box>
        ) : (
          <Box ai='flex-start' column gap='0'>
            <TextSpanStyle color='#787878'>Строится</TextSpanStyle>
            <TextSpanStyle nowrap size={16} color='#85009e'>
              {building?.build?.houses || 0} домов в {building?.build?.JK || 0}{' '}
              ЖК
            </TextSpanStyle>
          </Box>
        )}
      </BuilingCell>
      <BuilingCell>
        <Box>
          {building.devType === 'ИЖС' ? (
            <ButtonOffer>
              Комиссия от {building?.comissionSize || 0}
            </ButtonOffer>
          ) : (
            <ButtonOffer>{building?.countOffers || 0} предложения</ButtonOffer>
          )}
        </Box>
      </BuilingCell>
      {/* </Building> */}
    </BuilingLine>
  );
};

export default BuildersCard;
