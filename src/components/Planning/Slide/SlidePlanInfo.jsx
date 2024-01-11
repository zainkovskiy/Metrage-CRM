import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';

import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import DialogWindow from 'components/Main/DialogWindow';
import OfficeFinder from '../../Main/OfficeFinder';
import { setNewOffice, setNewPlanDate } from '../../../api/planApi';
import WindowPlanDate from './WindowPlanDate';
import moment from 'moment';

const SliderBlockMeta = styled(SliderBlock)`
  display: flex;
  justify-content: space-between;
`;

const SlidePlanInfo = () => {
  const plan = useAsyncValue();
  const [openDialog, setOpenDialog] = useState(null);
  const openDialogWindow = (e) => {
    const source = e.target.id;
    setOpenDialog(source);
  };
  const closeDialogWindow = () => {
    setOpenDialog(null);
  };
  const selectNewOffice = (office) => {
    setNewOffice({
      office: office.UID,
      UID: plan.UID,
    });
    plan.office = office.name;
  };
  const selectNewPlanDate = (date) => {
    setNewPlanDate({
      planDate: date,
      UID: plan.UID,
    });
    const strDate = moment(date).locale('ru').format('MMMM YYYY');
    const strDateFormat = strDate.charAt(0).toUpperCase() + strDate.slice(1);
    plan.planDate = strDateFormat;
  };
  return (
    <SliderBlockMeta>
      <Box>
        <TextSpanStyle>Офис:</TextSpanStyle>
        <ButtonLink id='office' color='#85009e' onClick={openDialogWindow}>
          {plan?.office || 'Выбрать'}
        </ButtonLink>
      </Box>
      <Box>
        <TextSpanStyle>Отчетный период:</TextSpanStyle>
        <ButtonLink id='date' color='#85009e' onClick={openDialogWindow}>
          {plan?.planDate || 'Выбрать'}
        </ButtonLink>
      </Box>
      <DialogWindow onClose={closeDialogWindow} open={openDialog === 'office'}>
        <div onClick={(e) => e.stopPropagation()}>
          <OfficeFinder
            onClose={closeDialogWindow}
            onChange={selectNewOffice}
          />
        </div>
      </DialogWindow>
      <DialogWindow onClose={closeDialogWindow} open={openDialog === 'date'}>
        <WindowPlanDate
          onClose={closeDialogWindow}
          onChange={selectNewPlanDate}
        />
      </DialogWindow>
    </SliderBlockMeta>
  );
};

export default SlidePlanInfo;
