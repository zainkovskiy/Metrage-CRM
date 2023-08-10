import React, { Children } from 'react';
import styled from 'styled-components';

const TaskSlideBarStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  ${({ $disabled }) => $disabled && 'pointer-events: none'};
  // ${({ $fullWidth }) => $fullWidth && 'width: 100%'};
  flex-grow: 1;
`
const SlideBarLineStyle = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  min-width: 5px;
`
const TaskSlideBar = ({ children, activeStep, disabled, fullWidth }) => {
  return (
    <TaskSlideBarStyle
      $disabled={disabled}
      $fullWidth={fullWidth}
    >
      {
        Children.map(children, (child, idx) => {
          return (
            <React.Fragment>
              {React.cloneElement(child, { ...child.props, active: activeStep >= idx, idx: idx })}
              {idx < Children.count(children) - 1 && <SlideBarLineStyle />}
            </React.Fragment>
          )
        })
      }
    </TaskSlideBarStyle>
  );
};
export default TaskSlideBar;