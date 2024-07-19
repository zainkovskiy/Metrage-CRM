import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const AvatarImage = styled.img`
  height: 48px;
  width: 48px;
  min-width: 48px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 50px;
  object-position: top;
`;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgb(249, 245, 245);
  padding: 0.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  flex-grow: 1;
`;

const SliderAvatar = ({ role, avatarData, keySubtitle, isChangeButton }) => {
  return (
    <Avatar>
      <Box jc='space-between'>
        <TextSpanStyle>{role}</TextSpanStyle>
        {isChangeButton && (
          <ButtonLink
            size={12}
            color='rgb(133, 0, 158)'
            onClick={isChangeButton}
          >
            Изменить
          </ButtonLink>
        )}
      </Box>
      <AvatarWrapper>
        <AvatarImage src={avatarData.avatar} />
        <div>
          <TextSpanStyle nowrap>{avatarData?.fullName}</TextSpanStyle>
          <TextSpanStyle color='#8e8e8e' size={12}>
            {avatarData[keySubtitle]}
          </TextSpanStyle>
        </div>
      </AvatarWrapper>
    </Avatar>
  );
};

export default SliderAvatar;
