import React, { Children } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const StatusBarStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  ${({ $disabled }) => $disabled && 'pointer-events: none'};
  ${({ $fullWidth }) => $fullWidth && 'width: 100%'};
  flex-grow: 1;
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap'};
  ${({ $column }) => $column && 'flex-direction: column'};
`;
const StatusBarLineStyle = styled.div`
  height: 1px;
  // width: 100%;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.color.primary};
  min-width: 5px;
`;
export const StatusBar = ({
  children,
  activeStep,
  disabled,
  fullWidth,
  wrap,
  column,
}) => {
  return (
    <StatusBarStyle
      $disabled={disabled}
      $fullWidth={fullWidth}
      $wrap={wrap}
      $column={column}
    >
      {Children.map(children, (child, idx) => {
        return (
          <React.Fragment>
            {React.cloneElement(child, {
              ...child.props,
              active: activeStep >= idx,
              idx: idx,
              fullWidth: column,
            })}
            {!column && (
              <>
                {idx < Children.count(children) - 1 && <StatusBarLineStyle />}
              </>
            )}
          </React.Fragment>
        );
      })}
    </StatusBarStyle>
  );
};

const StatusBarItemStyle = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%'};
`;
const CircleIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 40px;
  background-color: ${({ theme, active }) =>
    active ? theme.color.primary : '#e2e2e2'};
  transition: background-color 0.3s, transform 0.3s;
  ${StatusBarItemStyle}:hover & {
    transform: scale(1.2);
  }
  ${StatusBarItemStyle}:active & {
    transform: scale(0.8);
  }
`;
export const StatusBarItem = ({ title, active, onClick, idx, fullWidth }) => {
  const handleClick = () => {
    onClick(idx);
  };
  return (
    <StatusBarItemStyle onClick={handleClick} $fullWidth={fullWidth}>
      <CircleIcon active={active} />
      <TextSpanStyle size={12} nowrap={true}>
        {title}
      </TextSpanStyle>
    </StatusBarItemStyle>
  );
};
