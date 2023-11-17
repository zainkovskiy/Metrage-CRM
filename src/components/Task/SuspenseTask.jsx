import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const TaskContent = React.lazy(() => import('components/Task/TaskContent'));

const SuspenseTask = () => {
  return (
    <Suspense fallback={<Loader />}>
      <TaskContent />
    </Suspense>
  );
};

export default SuspenseTask;
