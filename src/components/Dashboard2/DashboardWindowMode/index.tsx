import React from 'react';
import * as S from './style';
import { IDashboardFormMode } from '../type';
import TextUI from '../../../uiTs/TextUI';

interface DashboardWindowModeProps extends IDashboardFormMode {
  onChange: (value: string) => void;
  isChecked: boolean;
}

const DashboardWindowMode = (props: DashboardWindowModeProps) => {
  const { modePicture, onChange, isChecked, modeType, modeTitle } = props;
  const handleClick = () => {
    onChange(modeType);
  };
  return (
    <S.DashboardWindowMode onClick={handleClick} $isChecked={isChecked}>
      <S.DashboardWindowModeImg src={modePicture} />
      <TextUI size={12} color='grey'>
        {modeTitle}
      </TextUI>
    </S.DashboardWindowMode>
  );
};

export default DashboardWindowMode;
