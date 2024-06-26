import React from 'react';
import { useSelector } from 'react-redux';
import MainInfoUser from './MainInfoUser';
import MainInfoBirthDay from './MainInfoBirthDay';
import MainInfoCalendar from './MainInfoCalendar';
import MainInfoDeals from './MainInfoDeals';
import styled from 'styled-components';
import { device } from '../../styles/device';
import crownUrl from 'images/crown.svg';

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
  gap: 0.5rem;
  min-width: 250px;
  box-shadow: -6px -6px 8px 0px rgba(97, 179, 189, 0.2);
  //TODO: видимо будет по условию
  /* background-image: url(${crownUrl});
  background-position: 2rem 0.5rem;
  background-size: 35%;
  background-repeat: no-repeat; */
  @media (${device.tablet}) {
    width: 100%;
  }
`;

const MainInfo = () => {
  const data = useSelector((state) => state.dashboard.data || {});
  return (
    <MainInfoStyle>
      <MainInfoUser {...data?.mainInfo} notify={data?.notify || null} />
      {/* <MainInfoCalendar events={data?.birthday || []} /> */}
      {data?.deals?.length > 0 && <MainInfoDeals deals={data?.deals || []} />}
      {data?.birthday?.length > 0 && (
        <MainInfoBirthDay birthday={data?.birthday || []} />
      )}
    </MainInfoStyle>
  );
};

export default MainInfo;
