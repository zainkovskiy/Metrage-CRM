import React from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import DashboardInstructions from '../DashboardInstructions';
import { ReactComponent as LogoSmall } from 'images/logo_small.svg';
import { setPeriodDashboard } from '../../../store/dashboardSlice2';
import DashboardIndicatorData from '../DashboardIndicatorData';
const DashboardIndicators = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard2);
  const setNewPeriod = (data) => {
    dispatch(setPeriodDashboard(data));
  };
  return (
    <S.DashboardIndicators>
      <DashboardIndicatorData
        period={data.period}
        indicators={data.titleIndicators}
        setNewPeriod={setNewPeriod}
      />
      <DashboardInstructions {...data.instructions} />
      <S.LogoWrap>
        <LogoSmall />
      </S.LogoWrap>
    </S.DashboardIndicators>
  );
};

export default DashboardIndicators;
