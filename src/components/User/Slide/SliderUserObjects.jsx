import React from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from '../../../hooks/StringHook';
import imgErrorUrl from 'images/img-error.svg';

const SliderUserObjects = () => {
  const user = useAsyncValue();
  return (
    <SliderBlock>
      <Box fullWidth gap='0.5rem' ai='normal' column>
        <SliderTitle>Объекты</SliderTitle>
        {user?.objects.map((object) => (
          <UserObjects object={object} key={object.UID} />
        ))}
      </Box>
    </SliderBlock>
  );
};

const UserObjectsStyle = styled(Link)`
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  box-sizing: border-box;
  transition: background 0.3s;
  @media (hover: hover) {
    &:hover {
      background: #eee;
    }
    &:active {
      background: #fff;
    }
  }
  @media (hover: none) {
    &:active {
      background: #eee;
    }
  }
`;
const UserObjectImage = styled.img`
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  height: 100px;
  object-fit: cover;
`;
const UserObjectsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const UserObjects = ({ object }) => {
  return (
    <UserObjectsStyle to={`/objects/${object.type}/${object.UID}`}>
      <UserObjectsWrapper>
        <UserObjectImage src={object.photo || imgErrorUrl} />
        <Box column ai='flex-start' fullWidth gap='0'>
          <TextSpanStyle size={12}>{object?.objType || ''}</TextSpanStyle>
          <TextSpanStyle size={12} bold>
            {object?.addrString || ''}
          </TextSpanStyle>
          <TextSpanStyle>
            {useNumberTriad(object?.price || '0')} руб.
          </TextSpanStyle>
        </Box>
      </UserObjectsWrapper>
    </UserObjectsStyle>
  );
};

export default SliderUserObjects;
