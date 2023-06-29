import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const ApplicationContent = React.lazy(() => import('components/Application/ApplicationContent'));

const SuspenseApplication = () => {
  return (
    <Suspense fallback={<Loader/>}> 
      <ApplicationContent/>
    </Suspense>
  );
};

export default SuspenseApplication;