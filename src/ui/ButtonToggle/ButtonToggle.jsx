import React from 'react';
import styled from 'styled-components';

const ButtonToggleGroupStyle = styled.div`
  display: flex;
  ${({ $disabled }) => $disabled && 'pointer-events: none'};
`
export const ButtonToggleGroup = ({ children, disabled }) => {
  return (
    <ButtonToggleGroupStyle $disabled={disabled}>
      {children}
    </ButtonToggleGroupStyle>
  );
};

const getItemComponent = (variant) => {
  switch (variant) {
    case 'light':
      return ButtonToggleItemLightStyle;
    default:
      return ButtonToggleItemStyle;
  }
}

export const ButtonToggleItem = (props) => {
  const ButtonToggleItemComponent = getItemComponent(props.variant);
  return (
    <ButtonToggleItemComponent {...props}>
      {props.children}
    </ButtonToggleItemComponent>
  );
};

const ButtonToggleItemStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme, id, active }) => id === active ? theme.color.primary : '#FFF'};
  color: ${({ theme, id, active }) => id === active ? '#fff' : theme.color.primary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  border-right: none;
  &: first-child{
    border-radius: 5px 0 0 5px;
  }
  &: last-child{
    border-radius: 0 5px 5px 0;
    border-right: 1px solid ${({ theme }) => theme.color.primary};
  }
`
const ButtonToggleItemLightStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ id, active }) => id === active ? '#FCEAEA' : '#FDFAFA'};
  text-decoration: ${({ id, active }) => id === active && 'underline'};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  border-right: none;
  &: first-child{
    border-radius: 5px 0 0 5px;
  }
  &: last-child{
    border-radius: 0 5px 5px 0;
    border-right: 1px solid ${({ theme }) => theme.color.primary};
  }
`