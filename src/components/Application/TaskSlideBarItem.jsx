import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const TaskSlideBarItemStyle = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
`
const BarItemCircleStyle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 40px;
  background-color: ${({theme, active}) => active ? theme.color.primary : '#e2e2e2'};
  transition: background-color .3s, transform .3s;
  ${TaskSlideBarItemStyle}:hover & {
    transform: scale(1.2);
  }
  ${TaskSlideBarItemStyle}:active & {
    transform: scale(0.8);
  }
`
const TaskSlideBarItem = ({title, active, onClick, idx}) => {
  const handleClick = () => {
    onClick(idx);
  }
  return (
    <TaskSlideBarItemStyle onClick={handleClick}>
      <BarItemCircleStyle active={active}/>
      <TextSpanStyle size={12} nowrap={true}>{title}</TextSpanStyle>
    </TaskSlideBarItemStyle>
  );
};

export default TaskSlideBarItem;