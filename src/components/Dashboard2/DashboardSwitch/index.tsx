import React, { useState } from 'react';
import { IDashboardForm, IMode } from '../type';
import * as S from './style';
import TextUI from '../../../uiTs/TextUI';
import DialogWindow from '../../Main/DialogWindow';
import DashboardWindowForm from '../DashboardWindowForm';

type DashboardSwitchProps = IMode & {
  sentNewModeForm: (value: IDashboardForm) => void;
};

const DashboardSwitch = (props: DashboardSwitchProps) => {
  const { currentModeTitle, currentViewedTitle, sentNewModeForm } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <S.DashboardSwitch>
      <TextUI size={12} color='grey'>
        {currentModeTitle}
      </TextUI>
      <S.DashboardButton onClick={handleOpen} />
      <TextUI size={12} bold>
        {currentViewedTitle}
      </TextUI>
      <DialogWindow open={open} onClose={handleOpen} disabledClose={true}>
        <DashboardWindowForm
          onClose={handleOpen}
          sentNewModeForm={sentNewModeForm}
        />
      </DialogWindow>
    </S.DashboardSwitch>
  );
};

export default DashboardSwitch;
