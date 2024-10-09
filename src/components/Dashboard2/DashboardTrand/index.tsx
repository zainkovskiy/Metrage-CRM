import React from 'react';
import * as S from './style';
import { IDashboardComponent, IDashboardTrand } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardTrandIndicator from '../DashboardTrandIndicator';

const DashboardTrand = (props: IDashboardTrand) => {
  const { titleComponent, indicators } = props;

  return (
    <S.DashboardTrand>
      <TextUI size={16} bold>
        {titleComponent}
      </TextUI>
      {indicators &&
        indicators.length > 0 &&
        indicators.map((indicator, idx) => (
          <DashboardTrandIndicator {...indicator} key={idx} />
        ))}
    </S.DashboardTrand>
  );
};

export default DashboardTrand;
