import React from 'react';
import { SliderTitle } from '../../styles/slider';
import styled from 'styled-components';
import MainInfoBirthDayList from './MainInfoBirthDayList';

const MainInfoBirthDayStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 50%;
  overflow: auto;
`;
const MainInfoBirthDay = ({ birthday }) => {
  return (
    <MainInfoBirthDayStyle>
      <SliderTitle>Именинники</SliderTitle>
      {birthday?.length > 0 &&
        birthday.map((list, idx) => (
          <MainInfoBirthDayList list={list} key={idx} />
        ))}
    </MainInfoBirthDayStyle>
  );
};

export default MainInfoBirthDay;
