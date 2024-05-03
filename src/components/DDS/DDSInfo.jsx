import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNumberTriad } from 'hooks/StringHook';
import { useDateFormat } from 'hooks/DateFormat';
import alertUrl from 'images/alert-triangle.svg';
import arrowGreenUrl from 'images/arrow-green.svg';
import arrowRedUrl from 'images/arrow-red.svg';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from '../../styles/slider';

const DDSInfoStyle = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const DDSInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.5rem;
`;
const IconSvg = styled.img`
  height: 16px;
  object-fit: contain;
`;
const DDSInfo = () => {
  const { ddsData } = useSelector((state) => state.dds);
  return (
    <DDSInfoStyle>
      <SliderTitle>
        Период с {useDateFormat(ddsData.periodFrom, 'DD.MM.YYYY')} по{' '}
        {useDateFormat(ddsData.periodTo, 'DD.MM.YYYY')}
      </SliderTitle>
      <DDSInfoContainer>
        <Box column ai='flex-start'>
          <Box jc='flex-start'>
            <IconSvg src={arrowGreenUrl} />
            <TextSpanStyle>
              Поступления:{' '}
              {ddsData?.coming ? useNumberTriad(ddsData?.coming) : '0'} руб.
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start'>
            <IconSvg src={arrowRedUrl} />
            <TextSpanStyle>
              Выплаты:{' '}
              {ddsData?.expense ? useNumberTriad(ddsData?.expense) : '0'} руб.
            </TextSpanStyle>
          </Box>
          <TextSpanStyle>Организация: {ddsData.legal.name}</TextSpanStyle>
        </Box>
        <Box column ai='flex-start'>
          <Box jc='flex-start'>
            <IconSvg src={alertUrl} />
            <TextSpanStyle>
              Совокупный ДП:{' '}
              {ddsData?.agregate ? useNumberTriad(ddsData?.agregate) : '0'} руб.
            </TextSpanStyle>
          </Box>
          <TextSpanStyle>
            Остаток на конец периода:{' '}
            {ddsData?.remains ? useNumberTriad(ddsData?.remains) : '0'} руб.
          </TextSpanStyle>
          <TextSpanStyle>Банк: {ddsData?.bank?.bankName}</TextSpanStyle>
        </Box>
      </DDSInfoContainer>
    </DDSInfoStyle>
  );
};

export default DDSInfo;
