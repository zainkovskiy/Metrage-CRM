import React, { Suspense } from 'react';
const ApplicationContent = React.lazy(() => import('components/Application/ApplicationContent'));
const Application = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ApplicationContent/>
    </Suspense>
  );
};

export default Application;