import React from 'react';
import { TaskBlockStyle, TaskSlideTitleStyle } from './TaskStyle';
import ApplicationCallsItem from './ApplicationCallsItem';

const ApplicationCalls = ({ calls }) => {
  if (!calls || calls.length === 0) {
    return
  }
  return (
    <TaskBlockStyle $column>
      <TaskSlideTitleStyle>Звонки</TaskSlideTitleStyle>
      {
        calls.map((call) =>
        <ApplicationCallsItem key={call.UID} call={call}/>
        )
      }
    </TaskBlockStyle>
  );
};

export default ApplicationCalls;