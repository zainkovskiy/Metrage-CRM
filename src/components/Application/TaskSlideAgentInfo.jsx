import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { TaskBlockStyle, TaskSlideTitleStyle, TaskSlideSide } from './TaskStyle';

const TaskSlideAgentInfoStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`

const TaskSlideAgentInfo = ({ responsible, recommender, children }) => {
  return (
    <TaskBlockStyle>
      <TaskSlideAgentInfoStyle>
        <TaskSlideSide>
          <TaskSlideTitleStyle>Агент:</TaskSlideTitleStyle>
          <div>
            <TextSpanStyle size={16}>{responsible?.title}</TextSpanStyle>
            <TextSpanStyle size={12} color='#ccc'>{responsible?.officeName}</TextSpanStyle>
          </div>
          {children}
        </TaskSlideSide>
        <TaskSlideSide>
          <TaskSlideTitleStyle>Рекомендатель:</TaskSlideTitleStyle>
          <div>
            <TextSpanStyle size={16}>{recommender?.title}</TextSpanStyle>
            <TextSpanStyle size={12} color='#ccc'>{recommender?.officeName}</TextSpanStyle>
          </div>
        </TaskSlideSide>
      </TaskSlideAgentInfoStyle>
    </TaskBlockStyle>
  );
};

export default TaskSlideAgentInfo;