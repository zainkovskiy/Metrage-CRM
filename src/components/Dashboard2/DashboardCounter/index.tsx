import React from 'react';
import * as S from './style';
import { IDashboardComponent } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardTrandIndicator from '../DashboardTrandIndicator';
import DashboardCounterIndicator from '../DashboardCounterIndicator ';

const DashboardCounter = (props: IDashboardComponent) => {
  const { titleComponent, indicators } = props;

  return (
    <S.DashboardCounter>
      <TextUI size={16} bold>
        {titleComponent}
      </TextUI>
      <S.DashboardCounterIndicators>
        {indicators.length > 0 &&
          indicators.map((indicator, idx) => (
            <DashboardCounterIndicator {...indicator} key={idx} />
          ))}
      </S.DashboardCounterIndicators>
    </S.DashboardCounter>
  );
};

export default DashboardCounter;
