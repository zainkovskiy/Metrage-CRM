import React from 'react';
import * as S from './style';
import { ICounterIndicators } from '../type';
import TextUI from '../../../uiTs/TextUI';

const DashboardCounterIndicator = (props: ICounterIndicators) => {
  const { bigIndex, littleIndex, comment, image } = props;

  return (
    <S.DashboardTrandIndicator>
      <S.DashboardTrandIndicatorImg src={image} />
      <S.DashboardTrandIndicatorText>
        <TextUI bold size={20} customColor={bigIndex.color}>
          {bigIndex.value}%
        </TextUI>
        <TextUI bold color='grey' size={16}>
          {littleIndex.value} шт.
        </TextUI>
        <TextUI size={12} color='grey'>
          {comment}
        </TextUI>
      </S.DashboardTrandIndicatorText>
    </S.DashboardTrandIndicator>
  );
};

export default DashboardCounterIndicator;
