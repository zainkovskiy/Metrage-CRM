import React from 'react';
import * as S from './style';
import { IDashboardCounter } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardCounterIndicator from '../DashboardCounterIndicator ';

const DashboardCounter = (props: IDashboardCounter) => {
  const { titleComponent, indicators } = props;

  return (
    <S.DashboardCounter>
      <TextUI size={16} bold>
        {titleComponent}
      </TextUI>
      <S.DashboardCounterIndicators>
        {indicators &&
          indicators.length > 0 &&
          indicators.map((indicator, idx) => (
            <DashboardCounterIndicator {...indicator} key={idx} />
          ))}
      </S.DashboardCounterIndicators>
    </S.DashboardCounter>
  );
};

export default DashboardCounter;
