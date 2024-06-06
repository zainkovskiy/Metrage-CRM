import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import DDSInfo from './DDSInfo';
import DDSDinamyc from './DDSDinamyc';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';

const DDSContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DDS = () => {
  const { loadingList, ddsData } = useSelector((state) => state.dds);
  if (loadingList) {
    return <Loader />;
  }
  return (
    <DDSContainer>
      <TextSpanStyle>
        Период с {useDateFormat(ddsData.periodFrom, 'DD.MM.YYYY')} по{' '}
        {useDateFormat(ddsData.periodTo, 'DD.MM.YYYY')}
      </TextSpanStyle>
      <DDSInfo />
      <DDSDinamyc />
    </DDSContainer>
  );
};

export default DDS;
