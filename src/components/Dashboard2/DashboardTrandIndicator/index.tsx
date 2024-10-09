import React from 'react';
import * as S from './style';
import { ITrandIndicators } from '../type';
import TextUI from '../../../uiTs/TextUI';
import { ReactComponent as Up } from '../../../public/images/trand_up.svg';
import { ReactComponent as Down } from '../../../public/images/trand_down.svg';

const DashboardTrandIndicator = (props: ITrandIndicators) => {
  const { name, bigIndex, littleIndex, comment, trandLine } = props;

  return (
    <S.DashboardTrandIndicator>
      <div>
        <TextUI size={14}>{name}</TextUI>
        <TextUI bold size={16} customColor={bigIndex.color}>
          {bigIndex.value}%
        </TextUI>
      </div>
      {trandLine === 'up' && <Up />}
      {trandLine === 'down' && <Down />}
      {trandLine === 'equal' && <div />}
      <div>
        <TextUI bold customColor={littleIndex.color} size={16}>
          {littleIndex.value}%
        </TextUI>
        <TextUI size={12} color='grey'>
          {comment}
        </TextUI>
      </div>
    </S.DashboardTrandIndicator>
  );
};

export default DashboardTrandIndicator;
