import React from 'react';
import { useSelector } from 'react-redux';
import MainInfoUser from './MainInfoUser';
import MainInfoBirthDay from './MainInfoBirthDay';
import MainInfoCalendar from './MainInfoCalendar';
import styled from 'styled-components';
import { device } from '../../styles/device';

const MainInfoStyle = styled.div`
  height: 100%;
  background-color: #f0dbf5;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 40px 0 40px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  @media (${device.tablet}) {
    width: 100%;
  }
`;

const MainInfo = () => {
  const data = useSelector((state) => state.dashboard.data || {});
  return (
    <MainInfoStyle>
      <MainInfoUser {...data?.mainInfo} notify={data?.notify || null} />
      <MainInfoCalendar events={data?.birthday || []} />
      <MainInfoBirthDay birthday={data?.birthday || []} />
    </MainInfoStyle>
  );
};

export default MainInfo;
