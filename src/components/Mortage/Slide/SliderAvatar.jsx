import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

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
`;

const SliderAvatar = ({ role, avatarData, keySubtitle }) => {
  return (
    <div>
      <TextSpanStyle>{role}</TextSpanStyle>
      <AvatarWrapper>
        <AvatarImage src={avatarData.avatar} />
        <div>
          <TextSpanStyle nowrap>{avatarData?.fullName}</TextSpanStyle>
          <TextSpanStyle color='#8e8e8e' size={12}>
            {avatarData[keySubtitle]}
          </TextSpanStyle>
        </div>
      </AvatarWrapper>
    </div>
  );
};

export default SliderAvatar;
