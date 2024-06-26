import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const PhoneTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ $success }) => ($success ? '#98D892' : '#C6D892')};
  border-radius: 5px;
`;

const PhoneTextBlock = ({ success, reason }) => {
  if (!success) {
    return;
  }
  return (
    <PhoneTextContainer $success={success === 'yes'}>
      <TextSpanStyle
        size={10}
        color={success === 'yes' ? '#85009E' : '#E51A1A'}
      >
        {success === 'yes' ? 'Номер проверен' : reason || ''}
      </TextSpanStyle>
    </PhoneTextContainer>
  );
};

export default PhoneTextBlock;
