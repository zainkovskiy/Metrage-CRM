import React from 'react';
import { SliderTitle } from '../../styles/slider';
import styled from 'styled-components';
import MainInfoBirthDayList from './MainInfoBirthDayList';

const MainInfoBirthDayStyle = styled.div`
  max-height: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: auto;
`;
const MainInfoBirthDay = ({ birthday }) => {
  return (
    <MainInfoBirthDayStyle>
      <SliderTitle>Именинники</SliderTitle>
      <ListContainer>
        {birthday?.length > 0 &&
          birthday.map((list, idx) => (
            <MainInfoBirthDayList list={list} key={idx} />
          ))}
      </ListContainer>
    </MainInfoBirthDayStyle>
  );
};

export default MainInfoBirthDay;
