import React from 'react';
import styled from 'styled-components';
import SlideDialogChart from './SlideDialogChart';
import { TextSpanStyle } from 'styles/styles';
import { device } from '../../../styles/device';

const SlideDialogChartViewStyle = styled.div`
  width: 60vw;
  min-height: 300px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (${device.tablet}) {
    width: 90vw;
  }
`;

const SlideDialogChartView = () => {
  return (
    <SlideDialogChartViewStyle onClick={(e) => e.stopPropagation()}>
      <TextSpanStyle align='center'>Просмотры Авито и ЦИАН</TextSpanStyle>
      <SlideDialogChart />
    </SlideDialogChartViewStyle>
  );
};

export default SlideDialogChartView;
