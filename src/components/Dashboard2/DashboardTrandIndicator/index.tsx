import React from 'react';
import * as S from './style';
import { ITrandIndicators } from '../type';
import TextUI from '../../../uiTs/TextUI';
import { ReactComponent as Up } from '../../../public/images/trand_up.svg';
import { ReactComponent as Down } from '../../../public/images/trand_down.svg';

const DashboardTrandIndicator = (props: ITrandIndicators) => {
  const { name, bigIndex, littleIndex, comment, trandLine } = props;

  return (
    <>
      <S.IndicatorText>
        <S.IndicatorTextDots>
          <TextUI size={14}>{name}</TextUI>
        </S.IndicatorTextDots>
        <S.Indicator>
          <TextUI bold size={16} customColor={bigIndex.color}>
            {bigIndex.value}
            {bigIndex.isPercent && '%'}
          </TextUI>
        </S.Indicator>
      </S.IndicatorText>
      {trandLine === 'up' && <Up />}
      {trandLine === 'down' && <Down />}
      {trandLine === 'equal' && <div />}
      <S.IndicatorText>
        <S.Indicator>
          <TextUI bold customColor={littleIndex.color} size={16}>
            {littleIndex.value}
            {littleIndex.isPercent && '%'}
          </TextUI>
        </S.Indicator>
        <S.IndicatorText>
          <S.IndicatorTextDotsTwoLine>
            <TextUI size={12} color='grey'>
              {comment}
            </TextUI>
          </S.IndicatorTextDotsTwoLine>
        </S.IndicatorText>
      </S.IndicatorText>
    </>
  );
};

export default DashboardTrandIndicator;
