import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const ObjectsContent = React.lazy(() => import('components/Objects/ObjectsContent'));

const SuspenseObjects = () => {
  return (
    <Suspense fallback={<Loader/>}> 
      <ObjectsContent/>
    </Suspense>
  );
};

export default SuspenseObjects;