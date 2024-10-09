import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './style';
import DashboardNote from '../DashboardNote';
import DashboardUser from '../DashboardUser';
import DashboardSwitch from '../DashboardSwitch';
import { setModeDashboard } from '../../../store/dashboardSlice2';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard2);

  const sentNewModeForm = (newForm) => {
    dispatch(setModeDashboard(newForm));
  };

  return (
    <S.DashboardHeader>
      <DashboardSwitch {...data.mode} sentNewModeForm={sentNewModeForm} />
      <S.DashboardNotes>
        {data.warnings && (
          <DashboardNote {...data.warnings} title='Важное' icon='bell' />
        )}
        {data.notice && (
          <DashboardNote {...data.notice} title='Cобытия' icon='mark' />
        )}
      </S.DashboardNotes>
      <DashboardUser {...data.viewer} />
    </S.DashboardHeader>
  );
};

export default DashboardHeader;
