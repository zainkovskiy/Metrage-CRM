import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;

const MainInfoDealsItem = ({ deal }) => {
  return (
    <Box jc='flex-start'>
      <Avatar
        src={useGetAvatar({
          avatar: deal?.avatar,
          // firsName: deal?.name,
          // lastName: deal?.lastName,
        })}
      />
      <Box column ai='flex-start' gap='0'>
        <TextSpanStyle size={10}>{deal?.dealTitle || ''}</TextSpanStyle>
        <TextSpanStyle size={12}>{deal?.responsible || ''}</TextSpanStyle>
      </Box>
    </Box>
  );
};

export default MainInfoDealsItem;
