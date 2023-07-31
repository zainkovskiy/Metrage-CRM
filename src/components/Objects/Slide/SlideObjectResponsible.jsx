import React from 'react';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';

const ResponsibleAvatar = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
`
const SlideObjectResponsible = ({ responsible }) => {
  return (
    <Box column ai='flex-start' gap='0.2rem'>
      <TextSpanStyle size={10}>Ответственный:</TextSpanStyle>
      <Box>
        <ResponsibleAvatar src={useGetAvatar(responsible || null)} />
        <TextSpanStyle>{responsible?.title || 'Неизвестный'}</TextSpanStyle>
      </Box>
    </Box>
  );
};

export default SlideObjectResponsible;