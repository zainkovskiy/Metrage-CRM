import React, { Suspense } from 'react';
const Task = React.lazy(() => import('./Task'))
const TaskContent = () => {
  return (
    <Suspense fallback={<p>Loading task....</p>}>
      <Task/>
    </Suspense>
  );
};

export default TaskContent;