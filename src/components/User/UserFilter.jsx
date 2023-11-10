import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
import UserFilterForm from './UserFilterForm';
import { useSelector } from 'react-redux';

const UserFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const UserFilter = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [open, setOpen] = useState(false);
  const windowSize = useWindowSize();
  const toggleFilter = () => {
    setOpen(!open);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  return (
    <UserFilterStyle>
      <ButtonUI size='small' onClick={toggleFilter}>
        Фильтр
      </ButtonUI>
      {isAdmin === '1' && (
        <Link to='new'>
          <ButtonUI size='small' variant='outline'>
            Создать
          </ButtonUI>
        </Link>
      )}
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <UserFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </UserFilterStyle>
  );
};

export default UserFilter;
