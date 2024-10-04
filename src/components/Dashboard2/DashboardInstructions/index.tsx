import React from 'react';
import * as S from './style';
import TextUI from '../../../uiTs/TextUI';
import { IDashboardInstructions } from '../type';

const DashboardInstructions = (props: IDashboardInstructions) => {
  const { comment, hasInstructions } = props;
  if (!hasInstructions) {
    return;
  }
  return (
    <S.DashboardInstructions>
      <TextUI size={12} color='grey'>
        Наставления Руководителя:
      </TextUI>
      <TextUI size={14}>{comment}</TextUI>
    </S.DashboardInstructions>
  );
};

export default DashboardInstructions;
