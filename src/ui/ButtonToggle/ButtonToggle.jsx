import React, { Children } from 'react';
import styled, { css } from 'styled-components';

const ButtonToggleGroupStyle = styled.div`
  display: flex;
  ${({ $disabled }) => $disabled && 'pointer-events: none;'};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'};
  ${({ $type }) =>
    $type === 'apart' &&
    css`
      gap: 0.5rem;
      flex-wrap: wrap;
    `}
`;
export const ButtonToggleGroup = ({
  children,
  disabled,
  fullWidth,
  type = 'together',
}) => {
  return (
    <ButtonToggleGroupStyle
      $disabled={disabled}
      fullWidth={fullWidth}
      $type={type}
    >
      {Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          fullWidth: fullWidth,
          type: type,
        });
      })}
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
};

export const ButtonToggleItem = (props) => {
  const ButtonToggleItemComponent = getItemComponent(props.variant, props.type);
  return (
    <ButtonToggleItemComponent {...props}>
      {props.children}
    </ButtonToggleItemComponent>
  );
};

const ButtonToggleItemStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme, id, active }) =>
    id === active ? theme.color.primary : '#FFF'};
  color: ${({ theme, id, active }) =>
    id === active ? '#fff' : theme.color.primary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  border-radius: 5px;
  ${({ fullWidth }) => fullWidth && 'width: 100%; text-align: center;'}
  ${({ type, theme }) =>
    type === 'together' &&
    css`
      border-radius: 0;
      border-right: none;
      &: first-child {
        border-radius: 5px 0 0 5px;
      }
      &: last-child {
        border-radius: 0 5px 5px 0;
        border-right: 1px solid ${theme.color.primary};
      }
    `};
`;
const ButtonToggleItemLightStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ id, active }) =>
    id === active ? '#FCEAEA' : '#FDFAFA'};
  text-decoration: ${({ id, active }) => id === active && 'underline'};
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family};
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  border-right: none;
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
    border-right: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
