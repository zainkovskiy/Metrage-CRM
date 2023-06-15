import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const FieldNotificationHeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({theme}) => theme.color.primary};  
`
const FieldNotification = () => {
  return (
    <>
      <FieldNotificationHeaderStyle>
        <TextSpanStyle size={24}>Уведомление</TextSpanStyle>
      </FieldNotificationHeaderStyle>
    </>
  );
};

export default FieldNotification;