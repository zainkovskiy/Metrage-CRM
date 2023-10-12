import React from 'react';
import { TextSpanStyle } from '../../styles/styles';
import { useDateFormat } from '../../hooks/DateFormat';
import MainInfoBirthDayUser from './MainInfoBirthDayUser';
import styled from 'styled-components';

const MainInfoBirthDayListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const MainInfoBirthDayList = ({ list }) => {
  return (
    <MainInfoBirthDayListStyle>
      <TextSpanStyle bold color='#8d8c8c'>
        {useDateFormat(list?.date, 'DD MMMM YYYY')}
      </TextSpanStyle>
      {list?.users?.length > 0 &&
        list.users.map((user, idx) => (
          <MainInfoBirthDayUser user={user} key={idx} />
        ))}
    </MainInfoBirthDayListStyle>
  );
};

export default MainInfoBirthDayList;
