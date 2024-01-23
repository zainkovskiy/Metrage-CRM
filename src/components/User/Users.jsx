import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import UserCard from './UserCard';
import { device } from 'styles/device';
import { SliderTitle } from '../../styles/slider';

const UsersContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const UsersStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;

const Users = () => {
  const loading = useSelector((state) => state.users.loadingList);
  const offices = useSelector((state) => state.users.users);
  if (loading) {
    return <Loader />;
  }
  return (
    <UsersContainer>
      <AnimatePresence>
        {offices.length &&
          offices.map((office) => (
            <React.Fragment key={office.officeName}>
              <SliderTitle>{office.officeName}</SliderTitle>
              <UsersStyle>
                {office.users.map((user) => (
                  <UserCard key={user.UID} user={user} />
                ))}
              </UsersStyle>
            </React.Fragment>
          ))}
      </AnimatePresence>
    </UsersContainer>
  );
};

export default Users;
